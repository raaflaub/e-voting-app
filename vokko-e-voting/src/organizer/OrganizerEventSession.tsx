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
import {getMotionById, getTimeString} from "../event/eventUtils";
import TimeLineButton from "../layout/TimeLineButton";
import {EventMonitorContext} from "../provider/EventMonitorContextProvider";
import VoteOnMotionDialog from "../vote/VoteOnMotionDialog";
import {useTranslation} from "react-i18next";
import VotePreviewDialog from "../vote/VotePreviewDialog";
import VoteResultDialog from "../vote/VoteResultDialog";
import {getVoteResultState} from "../vote/voteUtils";

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

    const anyVotesInProgress = event.motions?.some(motion => getVoteResultState(motion) === 'IN_PROGRESS');
    console.log('anyVotesInProgress', anyVotesInProgress);

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

    const [ showPreviewOfMotion, setShowPreviewOfMotion ] = useState<string|null>(null);
    const openPreviewDialog = (motion: IVoting) => {
        if (motion.id) {
            setShowPreviewOfMotion(motion.id);
        }
    }

    const [ showResultDialog, setShowResultDialog ] = useState<string|null>(null);
    const openResultDialog = (motion: IVoting) => {
        if (motion.id) {
            setShowResultDialog(motion.id);
        }
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
                    endDate: new Date(startDateNow.getTime() + (voteDurationMinutes * oneMinuteMillis))
                }
            }
        }
        updateEventMotionMutation.mutate(params);
    }

    const [ tieBreakVoteForMotion, setTieBreakVoteForMotion ] = useState<string|null>(null);
    const [ voteDurationMinutes, setVoteDurationMinutes ] = useState<number>(2);

    const tieBreak = (motion: IVoting) => {
        setTieBreakVoteForMotion(motion.id ?? null);
    }

    const eventSessionState =
        !event.eventDateAndTime? 'NOT_STARTED'
        : !event.endDateAndTime? 'RUNNING'
        : 'ENDED';

    return (
        <>
        <Container maxWidth="md">
            <EventStatusBar/>
            <Box py={4}>
            {
                (eventSessionState === 'NOT_STARTED') && event.motions &&
                <OrganizerMotionList
                    motions={event.motions}
                    onPreview={openPreviewDialog}
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
                        onPreview={openPreviewDialog}
                        onTieBreak={tieBreak}
                        onStartVote={startVote}
                        voteDisabled={anyVotesInProgress}
                        voteDurationMinutes={voteDurationMinutes}
                        setVoteDurationMinutes={setVoteDurationMinutes}
                        onViewResults={openResultDialog}
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
                        onPreview={openPreviewDialog}
                        onViewResults={openResultDialog}
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
                                <TimeLineButton variant="outlined" onClick={() => resetEvent()}>{t("reset")}</TimeLineButton>
                            }
                        </>
                        }
                    />
                }
            </Box>
        </Container>
            <VoteOnMotionDialog
                open={tieBreakVoteForMotion !== null}
                onClose={() => setTieBreakVoteForMotion(null)}
                motion={tieBreakVoteForMotion ? getMotionById(event, tieBreakVoteForMotion) : null}
                isTieBreakVote={true}
            />
            <VotePreviewDialog
                open={showPreviewOfMotion !== null}
                onClose={() => setShowPreviewOfMotion(null)}
                motion={showPreviewOfMotion ? getMotionById(event, showPreviewOfMotion) : null}
            />
            <VoteResultDialog
                open={showResultDialog !== null}
                onClose={() => setShowResultDialog(null)}
                motion={showResultDialog ? getMotionById(event, showResultDialog) : null}
            />
        </>
    );
}
