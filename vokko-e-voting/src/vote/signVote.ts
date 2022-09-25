import {CastVoteRequestData} from "../api/model/cast-vote-request-data";
import {RegisteredUser} from "../provider/UserContextProvider";
import {IKeyPair} from "../criptography/IKeyPair";
import {RsaProvider} from "../criptography/RsaProvider";
import {useState} from "react";

export interface SignVoteAPI {
    signedVoteRequest: CastVoteRequestData | null,
    isLoading: boolean,
    isSuccess: boolean,
    isError: boolean,
    error: any
    sign: (voteRequest: CastVoteRequestData) => void,
}

export function useSignVote(user: RegisteredUser): SignVoteAPI {

    async function sign(voteRequest: CastVoteRequestData) {
        try {
            console.log('### set isLoading');
            setSignVoteApi((signVoteApi) => ({
                ...signVoteApi, isLoading: true, isSuccess: false, isError: false, error: null, signedVoteRequest: null
            }));

            if (!user.user?.publicKey || !user.privateKey) {
                throw new Error("### invalid keypair");
            }

            const keyPair: IKeyPair = {
                PublicKey: user.user?.publicKey,
                PrivateKey: user.privateKey
            };

            const rsaProvider = new RsaProvider(window.crypto,new TextEncoder());
            await rsaProvider.ImportKeyPair(keyPair);

            const payload = voteRequest.userId! + voteRequest.votingId! + voteRequest.optionId!
            const signature = await rsaProvider.Sign(payload);

            setSignVoteApi((signVoteApi) => ({
                ...signVoteApi, isLoading: false, isSuccess: true, isError: false, signedVoteRequest: {...voteRequest, signature}
            }));

        } catch (e) {
            console.error('useSignVote.sign ERROR', e);
            setSignVoteApi((signVoteApi) => ({
                ...signVoteApi, isLoading: false, isSuccess: false, isError: true, error: e
            }));
        }
    }

    const INITIAL_SIGNVOTEAPI: SignVoteAPI = {
        signedVoteRequest: null,
        isLoading: false,
        isSuccess: false,
        isError: false,
        error: null,
        sign,
    }

    const [ signVoteApi, setSignVoteApi ] = useState<SignVoteAPI>(INITIAL_SIGNVOTEAPI);

    return signVoteApi;
}

