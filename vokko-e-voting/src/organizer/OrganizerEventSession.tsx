import React, {useContext, useEffect, useState} from 'react';
import {Box, Container} from "@mui/material";
import EventStatusBar from "../event/EventStatusBar";
import OrganizerMotionList from "./OrganizerMotionList";
import {IVoting} from "../api/model/ivoting";
import {Event} from "../api/model/event";
import {
    IUpdateEventMutationParameters,
    IUpdateMotionMutationParameters,
    useUpdateEventMutation,
    useUpdateMotionMutation
} from "../api/persistence";
import TimeLineLabel from "../layout/TimeLineLabel";
import {getTimeString} from "../event/eventUtils";
import TimeLineButton from "../layout/TimeLineButton";
import {EventMonitorContext} from "../provider/EventMonitorContextProvider";
import {useTranslation} from "react-i18next";

export type OrganizerEventSessionProps = { event: Event }

export default function OrganizerEventSession({ event }: OrganizerEventSessionProps) {

    const {t} = useTranslation();
    const [ currentTimeString, setCurrentTimeString ] = useState(getTimeString(new Date()));

    useEffect(() => {
        const intervalId = setInterval(() => setCurrentTimeString(getTimeString(new Date())), 5000);
        const cleanup = () => clearInterval(intervalId);
        return cleanup;
    }, [setCurrentTimeString])

    const eventMonitor = useContext(EventMonitorContext);
    const updateEventMutation = useUpdateEventMutation();
    const updateEventMotionMutation = useUpdateMotionMutation();

    const startEvent = (when: Date) => {
        const params: IUpdateEventMutationParameters = {
            eventId: event.id!,
            PatchEventRequestDocument:{
                data:{
                    startDate: when,
                    endDate: null
                }
            }
        };
        updateEventMutation.mutate(params);
    }

    const endEvent = (when: Date) => {
        const params: IUpdateEventMutationParameters = {
            eventId: event.id!,
            PatchEventRequestDocument:{
                data:{
                    startDate: event.eventDateAndTime,
                    endDate: when
                }
            }
        };
        updateEventMutation.mutate(params);
    }

    const resetEvent = () => {
        const params: IUpdateEventMutationParameters = {
            eventId: event.id!,
            PatchEventRequestDocument:{
                data:{
                    startDate: null,
                    endDate: null
                }
            }
        };
        updateEventMutation.mutate(params);
    }

    const startVote = (motion: IVoting) => {
        const startDateNow = new Date();
        const oneMinuteMillis = 60*1000;
        const params: IUpdateMotionMutationParameters = {
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
            <Box py={4}>
            {
                (eventSessionState === 'NOT_STARTED') && event.motions &&
                <OrganizerMotionList
                    motions={event.motions}
                    header={
                        <TimeLineButton variant="contained" onClick={() => startEvent(new Date())}>
                            {t("start_event")} ({currentTimeString})
                        </TimeLineButton>
                    }
                />
                }
                {
                    (eventSessionState === 'RUNNING') && event.motions &&
                    <OrganizerMotionList
                        motions={event.motions}
                        actionTitle={t("start_vote_now")}
                        onAction={startVote}
                        header={
                            <TimeLineLabel>
                                {getTimeString(event.eventDateAndTime ?? null)} – Start
                            </TimeLineLabel>
                        }
                        footer={
                            <TimeLineButton
                                variant={eventMonitor.motionsCompletedCount === eventMonitor.motionsCount ? "contained" : "outlined"}
                                onClick={() => endEvent(new Date())}>
                                {t("stop_event")} ({currentTimeString})
                            </TimeLineButton>
                        }
                    />
                }
                {
                    (eventSessionState === 'ENDED') && event.motions &&
                    <OrganizerMotionList
                        motions={event.motions}
                        header={
                            <TimeLineLabel>
                                {getTimeString(event.eventDateAndTime ?? null)} – {t("event_started")}
                            </TimeLineLabel>
                        }
                        footer={
                        <>
                            <TimeLineLabel>
                                {getTimeString(event.endDateAndTime ?? null)} – {t("event_ended")}
                            </TimeLineLabel>
                            {
                                (process.env.NODE_ENV === 'development') &&
                                <TimeLineButton variant="outlined" onClick={() => resetEvent()}>Reset</TimeLineButton>
                            }
                        </>
                        }
                    />
                }
            </Box>
        </Container>
    );
}
