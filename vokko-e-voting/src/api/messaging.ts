import {HttpTransportType, HubConnection, HubConnectionBuilder, HubConnectionState, LogLevel} from "@microsoft/signalr";
import {useEffect, useState} from "react";
import {EventMonitor} from "../model/vokkoEvents";

export const VOKKO_HUB_URL = "https://api.vokko.cloud/ws/v1/event";

export function useSignalrHub(url: string) {

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

export const INITIAL_EVENT_MONITOR: EventMonitor = {state:0, usersOnlineCount:0, usersRegisteredCount:0, currentMotion:null};

export function useEventMonitor(hub: HubConnection | null, eventId: string): EventMonitor {

    const [ eventMonitor, setEventMonitor ] = useState<EventMonitor>(INITIAL_EVENT_MONITOR);

    useEffect(() => {
        if (hub) {
            hub.on("OnEventChanged", setEventMonitor);
            hub.invoke("SubscribeToEvent", {ID: eventId});
            console.log('Subscribed to event ' + eventId);
        }

        const cleanup = () => {
            if (hub) {
                hub.invoke("UnSubscribeToEvent", {ID: eventId});
                hub.off("OnEventChanged");
                console.log('Unsubscribed from event ' + eventId);
            }
        }

        return cleanup;
    }, [hub, eventId]);

    return eventMonitor;
}
