import React from 'react';
import {Button, Paper, Stack, Typography} from "@mui/material";
import {Event} from '../model/vokkoEvents';

export type VokkoEventListProps = { title: string, events: Event[], onDetail?: (event: Event) => void, onJoin?: (event: Event) => void }

export default function VokkoEventList({ title, events, onDetail, onJoin }: VokkoEventListProps) {
    return (
        <>
        <Stack>
            <Typography variant="h5"> {title} </Typography>
            { events.map(
                event =>
                    <Paper key={event.id} style={{height:75, width:"100%", }}
                           onClick={e => { if (onDetail) onDetail(event);} }>
                        <Typography variant="h6"> {event.title} </Typography>
                        { onJoin && <Button onClick={ e => onJoin(event) }>Teilnehmen</Button>}
                    </Paper>
            ) }
        </Stack>
        </>
    );
}
