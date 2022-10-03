import {useContext} from 'react';
import {EventMonitorContext} from "../provider/EventMonitorContextProvider";
import {Badge, Box, CircularProgress, Typography} from "@mui/material";
import PeopleIcon from '@mui/icons-material/People';


export default function EventStatusBar() {
    const eventMonitor = useContext(EventMonitorContext);
    return (

            <Box sx={{ display: 'flex',width: '100%', flexDirection:'column',
                borderBottom: 1, borderColor: 'divider'
            }}>
                <Box sx={{ display: 'flex', width: '100%', flexDirection:'row',justifyContent:"space-between", padding: "15px 0 0px 0px"  }}>
                    <Badge badgeContent={eventMonitor?.usersOnlineCount} color="success">
                        <PeopleIcon fontSize="large" />
                    </Badge>
                    <CircularProgress size={30} color="success" variant="determinate" value={eventMonitor?.motionsCompletedCount/eventMonitor?.motionsCount*100} />

                </Box>
                <Box sx={{ display: 'flex', width: '100%', flexDirection:'row',justifyContent:"space-between", padding: "0px 0 15px 0px"  }}>
                    <Typography variant="body2" color="text.secondary">
                        {eventMonitor?.usersOnlineCount} of {eventMonitor?.usersRegisteredCount} users online
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {eventMonitor?.motionsCompletedCount} of {eventMonitor?.motionsCount} motions voted
                    </Typography>

                </Box>

            </Box>

    );
}
