import React from 'react';
import {Button, Container, Stack, Typography} from "@mui/material";
import EventStatusBar from "../event/EventStatusBar";
import OrganizerMotionList from "./OrganizerMotionList";
import {IVoting} from "../api/model/ivoting";
import {Event} from "../api/model/event";
import {useUpdateMotionMutation} from "../api/persistence";
import CategoryTitle from "../layout/CategoryTitle";
import TimeLineLabel from "../layout/TimeLineLabel";

export type OrganizerEventSessionProps = { event: Event }

type EventSessionState = 'NOT_STARTED' | 'RUNNING' | 'ENDED';

function getTimeString(dateTime: Date | null) {
    return dateTime?.toISOString().slice(11, 16);
}

export default function OrganizerEventSession({ event }: OrganizerEventSessionProps) {

    const updateEventMotionMutation = useUpdateMotionMutation();

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
        updateEventMotionMutation.mutate(params);
    }

    const eventSessionState =
        !event.eventDateAndTime? 'NOT_STARTED'
        : !event.endDateAndTime? 'RUNNING'
        : 'ENDED';

    return (
        <Container maxWidth="md">
            <EventStatusBar/>
            {
                (eventSessionState === 'NOT_STARTED') && event.motions &&
                <Stack>
                    <Button variant="contained">Event starten</Button>
                    <OrganizerMotionList
                        motions={event.motions}
                    />
                </Stack>
            }
            {
                (eventSessionState === 'RUNNING') && event.motions &&
                <Stack>
                    <OrganizerMotionList
                        motions={event.motions}
                        actionTitle="Wahl jetzt starten (1 Minute)"
                        onAction={startVote}
                        first={
                            <TimeLineLabel topLine>
                                {getTimeString(event.eventDateAndTime ?? null)} – Start
                            </TimeLineLabel>
                        }
                        last={
                            <Button variant="outlined">Event beenden</Button>
                        }
                    />
                </Stack>
            }
            {
                (eventSessionState === 'ENDED') && event.motions &&
                <Stack>
                    <Typography variant="h6" align="center">{getTimeString(event.eventDateAndTime ?? null)} Start</Typography>
                    <Button variant="contained">Event starten</Button>
                    <OrganizerMotionList
                        motions={event.motions}
                        first={
                            <TimeLineLabel topLine>
                                {getTimeString(event.eventDateAndTime ?? null)} – Start
                            </TimeLineLabel>
                        }
                        last={
                            <TimeLineLabel bottomLine>
                                {getTimeString(event.endDateAndTime ?? null)} – Ende
                            </TimeLineLabel>
                        }
                    />
                    <Typography variant="h6" align="center"></Typography>
                </Stack>
            }
        </Container>
    );
}
