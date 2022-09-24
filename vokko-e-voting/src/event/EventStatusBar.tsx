import {useContext} from 'react';
import {EventMonitorContext} from "../provider/EventMonitorContextProvider";
import {Typography} from "@mui/material";
import {eventMonitorToString} from "../api/messaging";

export default function EventStatusBar() {
    const eventMonitor = useContext(EventMonitorContext);
    return (
        <Typography>
            {eventMonitorToString(eventMonitor)}
        </Typography>
    );
}
