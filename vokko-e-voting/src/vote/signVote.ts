import {CastVoteRequestData} from "../api/model/cast-vote-request-data";
import {RegisteredUser} from "../provider/UserContextProvider";
import {IKeyPair} from "../criptography/IKeyPair";
import {RsaProvider} from "../criptography/RsaProvider";
import {useState} from "react";
import {useTranslation} from "react-i18next";

export interface SignVoteAPI {
    signedVoteRequest: CastVoteRequestData | null,
    isLoading: boolean,
    isSuccess: boolean,
    isError: boolean,
    error: any
    sign: (voteRequest: CastVoteRequestData) => void,
}

export function useSignVote(user: RegisteredUser): SignVoteAPI {

    const {t} = useTranslation();
    async function sign(voteRequest: CastVoteRequestData) {
        console.log('### SignVoteAPI.sign', new Date().toISOString());
        try {
            console.log('### set isLoading');
            setSignVoteApi((signVoteApi) => ({
                ...signVoteApi, isLoading: true, isSuccess: false, isError: false, error: null, signedVoteRequest: null
            }));

            if (!user.sameAsInBackend) {
                throw new Error('### signVote: user is not same as in backend: ' + JSON.stringify(user))
            }

            if (!user.value) {
                throw new Error('### signVote: user is not registered in local storage: ' + JSON.stringify(user))
            }

            const localUser = user.value!;

            if (!localUser.user?.publicKey || !localUser.privateKey) {
                console.error('### signVote: invalid keypair')
                throw new Error("### invalid keypair");
            }

            const keyPair: IKeyPair = {
                PublicKey: localUser.user?.publicKey,
                PrivateKey: localUser.privateKey
            };

            const rsaProvider = new RsaProvider(window.crypto,new TextEncoder());
            await rsaProvider.ImportKeyPair(keyPair);
            console.log('### import keypair');

            const payload = voteRequest.userId! + voteRequest.votingId! + voteRequest.optionId!
            console.log('### payload', payload);
            const signature = await rsaProvider.Sign(payload);
            console.log('### SIGNATURE', signature);
            console.log('SIGN', JSON.stringify({...voteRequest, signature, payload, keyPair }));
            setSignVoteApi((signVoteApi) => ({
                ...signVoteApi, isLoading: false, isSuccess: true, isError: false, signedVoteRequest: {...voteRequest, signature}
            }));
            console.log('### set isSuccess');

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

