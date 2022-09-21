import {useContext} from 'react';
import {EventMonitorContext} from "../provider/EventMonitorContextProvider";
import {Typography} from "@mui/material";

export default function EventStatusBar() {
    const eventMonitor = useContext(EventMonitorContext);
    return (
        <Typography>
            {JSON.stringify(eventMonitor, null, 1)}
        </Typography>
    );
}
