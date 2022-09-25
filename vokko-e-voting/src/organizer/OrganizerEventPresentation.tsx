import React from 'react';
import {Button, CircularProgress, Container, Stack, Typography} from "@mui/material";
import {Event} from "../api/model/event";
import {useParams} from "react-router-dom";
import {useMotionMutation, useResetEventsMutation} from "../api/persistence";
import EventMonitorContextProvider from "../provider/EventMonitorContextProvider";
import EventStatusBar from "../event/EventStatusBar";
import OrganizerMotionList from "./OrganizerMotionList";
import {IVoting} from "../api/model/ivoting";

export type OrganizerEventPresentationProps = { event: Event }

export default function OrganizerEventPresentation({ event }: OrganizerEventPresentationProps) {

    const params = useParams();

    const completeToDoMutation = useResetEventsMutation();

    const patchEventMotionMutation = useMotionMutation();

    const startVote = (motion: IVoting) => {
        const startDateNow = new Date();
        const oneMinuteMillis = 60*1000;
        const params = {
            eventId: event.id!,
            motionId: motion.id!,
            patchEventMotionRequestDocument: {
                data: {
                    startDate: startDateNow,
                    endDate: new Date(startDateNow.getTime() + oneMinuteMillis)
                }
            }
        }
        patchEventMotionMutation.mutate(params);
    }

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
                    event && event.motions &&
                    <EventMonitorContextProvider eventId={event.id!}>
                        <Container maxWidth="md">
                            <EventStatusBar/>
                            <OrganizerMotionList
                                motions={event.motions}
                                actionTitle="Wahl jetzt starten (1 Minute)"
                                onAction={startVote}
                            />
                        </Container>
                    </EventMonitorContextProvider>
                }
            </Stack>
        </Container>
    );
}
