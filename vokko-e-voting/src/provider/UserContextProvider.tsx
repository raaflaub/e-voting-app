import {createContext, ReactNode} from 'react';
import {IUser} from "../api/model/iuser";
import {LocalStorageAPI, useLocallyStoredState} from "../api/localstorage";
import {useUser} from "../api/persistence";

interface LocalUser {
    user?: IUser;
    privateKey?: string | null;
}

export interface RegisteredUser extends LocalStorageAPI<LocalUser> {
    sameAsInBackend: boolean | null;
}

export const UserContext = createContext<RegisteredUser>({
        value: null,
        setValue: value => {},
        loading: true,
        sameAsInBackend: null,
    }
);

export type UserContextProviderProps = { children: ReactNode };

export default function UserContextProvider({ children }: UserContextProviderProps) {

    const localUserApi = useLocallyStoredState<LocalUser>('VOKKO_USER');
    const backendUser = useUser(localUserApi.value?.user?.userId ?? '');

    const registeredUser = {
        ...localUserApi,
        loading: localUserApi.loading || backendUser.isLoading,
        sameAsInBackend:
            (localUserApi.loading || backendUser.isLoading) ? null
            : backendUser.isError ? false
            : backendUser.isSuccess ?
                        (backendUser?.user?.userId === localUserApi.value?.user?.userId)
                        && (backendUser?.user?.publicKey === localUserApi.value?.user?.publicKey)
            : null,
    };

    console.log('UserContextProvider', registeredUser.sameAsInBackend);

    return (
        <UserContext.Provider value={registeredUser}>
            {children}
        </UserContext.Provider>
    );
}

