import React from 'react';
import {Button, CircularProgress, Container, Stack, Typography} from "@mui/material";
import {Event} from "../api/model/event";
import {useParams} from "react-router-dom";
import {useUpdateMotionMutation, useResetEventsMutation} from "../api/persistence";
import EventMonitorContextProvider from "../provider/EventMonitorContextProvider";
import EventStatusBar from "../event/EventStatusBar";
import OrganizerMotionList from "./OrganizerMotionList";
import {IVoting} from "../api/model/ivoting";
import OrganizerEventSession from "./OrganizerEventSession";

export type OrganizerEventPresentationProps = { event: Event }

export default function OrganizerEventPresentation({ event }: OrganizerEventPresentationProps) {

    const params = useParams();

    const completeToDoMutation = useResetEventsMutation();

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

