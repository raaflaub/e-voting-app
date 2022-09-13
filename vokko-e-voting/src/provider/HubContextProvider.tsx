import {createContext, ReactNode} from 'react';
import {useSignalrHub} from "../api/messaging";
import {HubConnection} from "@microsoft/signalr";

export const HubContext = createContext<HubConnection | null>(null);

export type HubContextProviderProps = { url: string, loadingIndicator: ReactNode, children: ReactNode };

export default function HubContextProvider({ url, loadingIndicator, children }: HubContextProviderProps) {

    const hub = useSignalrHub(url);

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

