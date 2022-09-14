import React from 'react';
import {Stack} from "@mui/material";
import {Event} from '../model/event';
import EventListItem from "./EventListItem";
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
