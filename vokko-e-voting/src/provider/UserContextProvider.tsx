import {createContext, ReactNode} from 'react';
import {useSignalrHub} from "../api/messaging";
import {HubConnection} from "@microsoft/signalr";
import {CreateUserResponseData} from "../api/model/create-user-response-data";
import {IUser} from "../api/model/iuser";
import {LocalStorageAPI, useLocallyStoredState} from "../api/localstorage";

export interface RegisteredUser {
    user?: IUser;
    role?: 'VOTER' | 'ORGANIZER';
    privateKey?: string | null;
}

export const UserContext = createContext<LocalStorageAPI<RegisteredUser>>({ value: null, setValue: value => {}, loading: true});

export type UserContextProviderProps = { children: ReactNode };

export default function UserContextProvider({ children }: UserContextProviderProps) {

    const registeredUserApi = useLocallyStoredState<RegisteredUser>('VOKKO_USER');

    return (
        <UserContext.Provider value={registeredUserApi}>
            {children}
        </UserContext.Provider>
    );
}

