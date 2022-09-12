import React from 'react';
import {Button, Paper, Stack, Typography} from "@mui/material";
import {Event} from '../model/vokkoEvents';
import EventListItem, {EventListItemProps} from "./EventListItem";
import CategoryTitle from "../layout/CategoryTitle";

export type EventListProps = {
    title: string,
    events: Event[],
    actionTitle?: string,
    onAction?: (event: Event) => void,
    primary?: boolean
}

export default function EventList({ title, events, actionTitle, onAction, primary }: EventListProps) {
    return (
        <>
        <Stack spacing={2} mb={5}>
            <CategoryTitle> {title} </CategoryTitle>
            { events.map(
                event =>
                    <EventListItem
                        key={event.id}
                        event={event}
                        actionTitle={actionTitle}
                        onAction={onAction}
                        primary={primary} />
            ) }
        </Stack>
        </>
    );
}
