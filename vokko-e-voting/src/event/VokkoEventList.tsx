import React from 'react';
import {Stack} from "@mui/material";
import {Event} from '../model/vokkoEvents';

export type VokkoEventListProps = { title: string, events: Event[], onDetail?: (event: Event) => void, onJoin?: (event: Event) => void }

export default function VokkoEventList({ title, events, onDetail, onJoin }: VokkoEventListProps) {
    return (
        <Stack>
            { events.map(
                event => <div key={event.id}> {event.title} </div>
            ) }
        </Stack>
    );
}
