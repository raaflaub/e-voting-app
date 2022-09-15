import React from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import {Event} from "../api/model/event";

export type EventListItemProps = {
        event: Event,
        actionTitle?: string,
        onAction?: (event: Event) => void,
        primary?: boolean
    }

export default function EventListItem({ event, actionTitle, onAction, primary }: EventListItemProps) {
    return (
        <Card sx={{backgroundColor: "#f5f5f5"}} raised={primary}>
            <CardContent>
                {event.eventDateAndTime &&
                <Typography color="text.secondary">
                    {event.eventDateAndTime.toLocaleString()}
                </Typography>
                }
                <Typography variant="h6" component="div">
                    { event.title }
                </Typography>
            </CardContent>
            {
                onAction &&
                <CardActions sx={{display: 'flex', justifyContent: 'end'}}>
                    <Button
                        variant={(primary ? "contained" : "text")}
                        onClick={e => onAction(event)}
                    >
                        { actionTitle }
                    </Button>
                </CardActions>
            }
        </Card>
    );
}
