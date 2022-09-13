import {useContext} from 'react';
import {EventMonitorContext} from "../provider/EventMonitorContextProvider";

export default function EventStatusBar() {
    const eventMonitor = useContext(EventMonitorContext);
    return (
        <div>
            {JSON.stringify(eventMonitor)}
        </div>
    );
}
