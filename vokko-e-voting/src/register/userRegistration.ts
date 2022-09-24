import {IUser} from "../api/model/iuser";
import {useSearchParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {CreateUserRequestDocument} from "../api/model/create-user-request-document";
import {UserContext} from "../provider/UserContextProvider";
import {useCreateUserMutation} from "../api/persistence";
import {RsaProvider} from "../criptography/RsaProvider";
import {IKeyPair} from "../criptography/IKeyPair";

function isUserComplete(user: IUser) {
    const EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    const invitationLinkIsComplete =
        typeof user.firstName === 'string' && user.firstName !== ''
        && typeof user.lastName === 'string' && user.lastName !== ''
        && typeof user.email === 'string' && EMAIL_REGEX.test(user.email);
    return invitationLinkIsComplete;
}

function useInvitationLinkUser() {
    const [searchParams] = useSearchParams();
    const invitationLinkUser = {
        firstName: searchParams.get("firstname"),
        lastName: searchParams.get("lastname"),
        email: searchParams.get("email")
    };
    return { invitationLinkUser, invitationLinkIsComplete: isUserComplete(invitationLinkUser)};
}

function useRegisteredUser() {
    const registeredUser = useContext(UserContext);
    const userIsRegistered = !registeredUser.loading && (registeredUser.value !== null);

    const registrationIsComplete =
        userIsRegistered
        && typeof registeredUser.value?.user?.userId === 'string' && (registeredUser.value?.user?.userId !== '')
        && typeof registeredUser.value?.user?.firstName === 'string' && (registeredUser.value?.user?.firstName !== '')
        && typeof registeredUser.value?.user?.lastName === 'string' && (registeredUser.value?.user?.lastName !== '')
        && typeof registeredUser.value?.user?.email === 'string' && (registeredUser.value?.user?.email !== '')
        && typeof registeredUser.value?.privateKey === 'string' && (registeredUser.value?.privateKey !== '');
    return {registeredUser, userIsRegistered, registrationIsComplete};
}

export function useRegistrationByInvitationLink() {

    const { registeredUser, userIsRegistered, registrationIsComplete } = useRegisteredUser();
    const { invitationLinkUser, invitationLinkIsComplete } = useInvitationLinkUser();

    const registrationMatchesInvitationLink =
        invitationLinkIsComplete && registrationIsComplete
        && (registeredUser.value?.user?.firstName === invitationLinkUser.firstName)
        && (registeredUser.value?.user?.lastName === invitationLinkUser.lastName)
        && (registeredUser.value?.user?.email === invitationLinkUser.email);

    // const [
    //     { data: createUserResponseDocument, loading: createUserLoading, error: createUserError },
    //     executeBackendRegistration
    // ] = useAxios<CreateUserResponseDocument>(
    //     {
    //         url: 'users',
    //         method: 'POST'
    //     },
    //     { manual: true }
    // )
    const createUserMutation = useCreateUserMutation();
    const createUserResponseDocument = createUserMutation.data?.data;

    const createUserResponseIsComplete =
        createUserMutation.isSuccess && createUserResponseDocument && createUserResponseDocument.data && createUserResponseDocument.data!.user
        && typeof createUserResponseDocument.data?.user?.userId === 'string' && (createUserResponseDocument.data?.user?.userId !== '')
        && typeof createUserResponseDocument.data?.user?.firstName === 'string' && (createUserResponseDocument.data?.user?.firstName !== '')
        && typeof createUserResponseDocument.data?.user?.lastName === 'string' && (createUserResponseDocument.data?.user?.lastName !== '')
        && typeof createUserResponseDocument.data?.user?.email === 'string' && (createUserResponseDocument.data?.user?.email !== '');

    const loading =
        registeredUser.loading
        || createUserMutation.isLoading;

    const error =
        (!invitationLinkIsComplete)
        || createUserMutation.isError
        || (createUserResponseDocument && !createUserResponseIsComplete);

    const registrationInProgess =
        (
            registeredUser.loading
            || (!userIsRegistered)
            || (!registrationIsComplete)
            || (!registrationMatchesInvitationLink)
            || createUserMutation.isLoading
        )
        && (!error);


    const [keyPair, setKeyPair] = useState<IKeyPair | null>(null);

    useEffect(() => {
        if (registrationInProgess && !loading && !error) {

            if (!createUserResponseDocument && !keyPair) {

                const rsaProvider = new RsaProvider(null);
                rsaProvider.GenerateKeyPair().then((keyPair: IKeyPair) => setKeyPair(keyPair));
            }

            if (!createUserResponseDocument && keyPair) {
                const createUserRequestDocument: CreateUserRequestDocument = {
                    data: {
                        phoneIdentification: "+41774929586",
                        lastName: invitationLinkUser.lastName,
                        firstName: invitationLinkUser.firstName,
                        email: invitationLinkUser.email,
                        publicKey: keyPair.PublicKey
                    }
                };

                createUserMutation.mutate(createUserRequestDocument);
            }

            if (createUserResponseDocument) {
                registeredUser.setValue({
                    user: createUserResponseDocument.data?.user,
                    privateKey: keyPair?.PrivateKey
                });
            }
        }

    }, [registeredUser, invitationLinkUser, registrationInProgess, loading, error, createUserResponseDocument, createUserMutation,keyPair]);
    return { invitationLinkUser, registrationInProgess, error };
}
