import {createContext, ReactNode} from 'react';
import {useSignalrHub} from "../api/messaging";
import {HubConnection} from "@microsoft/signalr";

export const HubContext = createContext<HubConnection | null>(null);

export type HubContextProviderProps = { loadingIndicator: ReactNode, children: ReactNode };

export default function HubContextProvider({ loadingIndicator, children }: HubContextProviderProps) {

    const hub = useSignalrHub();

    if (!hub) {
        return (
            <>
                {loadingIndicator}
            </>);
    } else {
        return (
            <HubContext.Provider value={hub}>
                {children}
            </HubContext.Provider>
        );
    }
}

