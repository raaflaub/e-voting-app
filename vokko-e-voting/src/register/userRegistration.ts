import {IUser} from "../api/model/iuser";
import {useSearchParams} from "react-router-dom";
import {useContext, useEffect} from "react";
import {CreateUserRequestDocument} from "../api/model/create-user-request-document";
import useAxios from "axios-hooks";
import {CreateUserResponseDocument} from "../api/model/create-user-response-document";
import {UserContext} from "../provider/UserContextProvider";

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

    const [
        { data: createUserResponseDocument, loading: createUserLoading, error: createUserError },
        executeBackendRegistration
    ] = useAxios<CreateUserResponseDocument>(
        {
            url: 'users',
            method: 'POST'
        },
        { manual: true }
    )

    const createUserResponseIsComplete =
        createUserResponseDocument && createUserResponseDocument.data && createUserResponseDocument.data.user
        && typeof createUserResponseDocument.data?.user?.userId === 'string' && (createUserResponseDocument.data?.user?.userId !== '')
        && typeof createUserResponseDocument.data?.user?.firstName === 'string' && (createUserResponseDocument.data?.user?.firstName !== '')
        && typeof createUserResponseDocument.data?.user?.lastName === 'string' && (createUserResponseDocument.data?.user?.lastName !== '')
        && typeof createUserResponseDocument.data?.user?.email === 'string' && (createUserResponseDocument.data?.user?.email !== '')
        && typeof createUserResponseDocument.data?.privateKey === 'string' && (createUserResponseDocument.data?.privateKey !== '');
    console.log('backend response complete:',createUserResponseIsComplete,JSON.stringify(createUserResponseDocument?.data?.user?.userId),JSON.stringify(createUserResponseDocument?.data?.user?.email));
    if (!createUserResponseIsComplete) {
        if (createUserResponseDocument) {
            //console.log('backend response',JSON.stringify(createUserResponseDocument));
            console.log('typeof userId', typeof createUserResponseDocument.data?.user?.userId);
            console.log('typeof firstName', typeof createUserResponseDocument.data?.user?.firstName);
            console.log('typeof lastName', typeof createUserResponseDocument.data?.user?.lastName);
            console.log('typeof email', typeof createUserResponseDocument.data?.user?.email);
            console.log('typeof privateKey', typeof createUserResponseDocument.data?.privateKey);
        }
    }

    const loading =
        registeredUser.loading
        || createUserLoading;

    const error =
        (!invitationLinkIsComplete)
        || createUserError
        || (createUserResponseDocument && !createUserResponseIsComplete);

    const registrationInProgess =
        (
            registeredUser.loading
            || (!userIsRegistered)
            || (!registrationIsComplete)
            || (!registrationMatchesInvitationLink)
            || createUserLoading
        )
        && (!error);

    useEffect(() => {
        if (registrationInProgess && !loading && !error) {

            if (!createUserResponseDocument) {

                const createUserRequestDocument: CreateUserRequestDocument = {
                    data: {
                        phoneIdentification: "+41774929586",
                        lastName: invitationLinkUser.lastName,
                        firstName: invitationLinkUser.firstName,
                        email: invitationLinkUser.email
                    }
                };

                console.log('starting backend registration', JSON.stringify(createUserRequestDocument));
                executeBackendRegistration({
                    data: createUserRequestDocument
                })
            }

            if (createUserResponseDocument) {
                console.log('storing backend registration response data');
                registeredUser.setValue({
                    user: createUserResponseDocument.data?.user,
                    privateKey: createUserResponseDocument.data?.privateKey
                });
            }
        }

    }, [registrationInProgess, loading, error, createUserResponseDocument]);

    return { invitationLinkUser, registrationInProgess, error };
}
