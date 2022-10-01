import React from 'react';
import {Container, Stack} from "@mui/material";
import {Event} from "../api/model/event";
import EventMonitorContextProvider from "../provider/EventMonitorContextProvider";
import OrganizerEventSession from "./OrganizerEventSession";

export type OrganizerEventPresentationProps = { event: Event }

export default function OrganizerEventPresentation({ event }: OrganizerEventPresentationProps) {

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
                        <OrganizerEventSession event={event} />
                    </EventMonitorContextProvider>
                }
            </Stack>
        </Container>
    );
}

