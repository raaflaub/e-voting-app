import React from 'react';
import {Container, Stack} from "@mui/material";
import {Event} from "../api/model/event";
import EventMonitorContextProvider from "../provider/EventMonitorContextProvider";
import OrganizerResultList from "./OrganizerResultList";

export type OrganizerEventResultListProps = { event: Event }

export default function OrganizerEventResultList( {event} :  OrganizerEventResultListProps) {

    return (
        <Container maxWidth="sm">
            <Stack display="flex"
                   marginTop={6}
                   flexDirection="column"
                   justifyContent="center"
                   alignItems="center"
                   spacing={4}
            >
                {
                    event &&
                    <EventMonitorContextProvider eventId={event.id!}>
                        <OrganizerResultList motions={event.motions!} />
                    </EventMonitorContextProvider>
                }
            </Stack>
        </Container>
    );
}

