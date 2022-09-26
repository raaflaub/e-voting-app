import {HttpTransportType, HubConnection, HubConnectionBuilder, HubConnectionState, LogLevel} from "@microsoft/signalr";
import {useEffect, useState} from "react";
import {EventMonitor} from "../api/model/EventMonitor";
import {IEventParameter} from "../api/model/IEventParameter";
import {useRefreshEvents} from "./persistence";
import {IVoting} from "./model/ivoting";
import {responseDateTransformer} from "./dateTransformer";


export function useSignalrHub() {

    const url = `${process.env.REACT_APP_WS_API_BASE_URL}/ws/v1/event`;
    console.log('useSignalrHub url=', url);

    const [ connection, setConnection ] = useState<HubConnection | null>(null);

    useEffect(() => {
        let cleanupCalled = false;

        // Generate a unique name for the connection for logging
        const connectionName = Math.random().toString(36).substring(3,7);

        const newConnection = new HubConnectionBuilder()
            .withUrl(url, {
                skipNegotiation: true,
                transport: HttpTransportType.WebSockets
            })
            .configureLogging(LogLevel.Information)
            .withAutomaticReconnect()
            .build();

        console.log(`Connection ${connectionName} connecting`);
        newConnection.start().then(() => {
            if (cleanupCalled) {
                console.log(`Connection ${connectionName} disconnecting after cleanup`);
                newConnection.stop();
            } else {
                console.log(`Connection ${connectionName} connected`);
                setConnection(newConnection);
            }
        }).catch(e => {
            console.log(`Connection ${connectionName} error while connecting: ${e}`);
        });

        const cleanup = () => {
            console.log(`Connection ${connectionName} cleanup called while ${newConnection.state}`);
            cleanupCalled = true;
            if(newConnection.state === HubConnectionState.Connected) {
                newConnection.stop();
                console.log(connectionName + ' | DISCONNECTED');
                setConnection( null);
             }
        }

        return cleanup;

    }, [url]);

    return connection;
}

export const INITIAL_EVENT_MONITOR: EventMonitor = {
    state: 0, usersOnlineCount: 0, usersRegisteredCount: 0, currentMotion: null, lastMotion: null, motionsCount: 0, motionsCompletedCount: 0
};

export function useEventMonitor(hub: HubConnection | null, { id, userId }: IEventParameter): EventMonitor {

    const [ eventMonitor, setEventMonitor ] = useState<EventMonitor>(INITIAL_EVENT_MONITOR);
    const refreshEvents = useRefreshEvents();

    function setEventMonitorWithRefresh(value: EventMonitor) {
        const valueWithDates = responseDateTransformer(value);
//        console.log('setEventMonitor ', eventMonitorToString(valueWithDates));
        refreshEvents();
        setEventMonitor(valueWithDates);
    }

    useEffect(() => {
        if (hub) {
            hub.on("OnEventChanged", setEventMonitorWithRefresh);
            hub.invoke("SubscribeToEvent", { ID: id, UserID: userId });
            console.log(`Subscribed to event ${id}  as user ${userId}`);
        }

        const cleanup = () => {
            if (hub) {
                hub.invoke("UnSubscribeToEvent", { ID: id, UserID: userId });
                hub.off("OnEventChanged");
                console.log(`Unsubscribed from event ${id}  as user ${userId}`);
            }
        }

        return cleanup;
    }, [hub, id, userId]);

    return eventMonitor;
}

export function votingDateToString(d: Date | null | undefined): string {
    if (!d) return "null";
    return `${d.toLocaleTimeString()}`;
}
export function votingToString(name: string, voting: IVoting | null): string {
    if (!voting) return `[${name}|null] `;
    return `[${name}|${voting.votingTitle}|${votingDateToString(voting.startDate)}|${votingDateToString(voting.endDate)}] `;
}

export function eventMonitorToString(eventMonitor: EventMonitor): string {
    return `[users|${eventMonitor.usersOnlineCount}|${eventMonitor.usersRegisteredCount}] `
        + votingToString("current", eventMonitor.currentMotion)
        + votingToString("last", eventMonitor.lastMotion);
}
