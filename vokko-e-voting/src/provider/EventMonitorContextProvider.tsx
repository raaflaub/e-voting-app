import {createContext, ReactNode, useContext} from 'react';
import {INITIAL_EVENT_MONITOR, useEventMonitor} from "../api/messaging";
import {HubContext} from "./HubContextProvider";
import {EventMonitor} from "../api/model/EventMonitor";
import {UserContext} from "./UserContextProvider";

export const EventMonitorContext = createContext<EventMonitor>(INITIAL_EVENT_MONITOR);

export type EventMonitorContextProviderProps = { eventId: string, children: ReactNode }

export default function EventMonitorContextProvider({ eventId, children }: EventMonitorContextProviderProps) {

    const hub = useContext(HubContext);
    const user = useContext(UserContext);

    const eventMonitor = useEventMonitor(hub, { id: eventId, userId: user!.value!.user!.userId! } );

    return (
        <EventMonitorContext.Provider value={eventMonitor}>
            {children}
        </EventMonitorContext.Provider>
    );
}
