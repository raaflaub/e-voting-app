import {createContext, ReactNode} from 'react';
import {useSignalrHub} from "../api/messaging";
import {HubConnection} from "@microsoft/signalr";

export const HubContext = createContext<HubConnection | null>(null);

export type HubContextProviderProps = { children: ReactNode };

export default function HubContextProvider({ children }: HubContextProviderProps) {

    const hub = useSignalrHub();

    return (
        <HubContext.Provider value={hub}>
            {children}
        </HubContext.Provider>
    );
}

