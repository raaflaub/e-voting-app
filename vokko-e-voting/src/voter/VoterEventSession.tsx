import React, {useContext, useEffect, useState} from 'react';
import VokkoHeader from "../header/VokkoHeader";
import {useParams} from "react-router-dom";
import MotionList from "../motion/MotionList";
import {Container, Stack} from "@mui/material";
import EventMonitorContextProvider from "../provider/EventMonitorContextProvider";
import EventStatusBar from "../event/EventStatusBar";
import {useEvent} from "../api/persistence";
import VoteDialogs from "../vote/VoteDialogs";
import {IVoting} from "../api/model/ivoting";
import {useVotingStartEndNotifications, VotingDialogState} from "../vote/votingStartedEndedNotifications";
import CastVotesHistoryContextProvider from "../provider/CastVotesHistoryContextProvider";

export default function VoterEventSession() {

    const params = useParams();
    const { event }  = useEvent(params.eventId!);

    return (
        <>
            <VokkoHeader title={event?.title} userProfile={true} />
            {
                event &&
                <EventMonitorContextProvider eventId={event.id!}>
                    <CastVotesHistoryContextProvider>
                    <InnerEventSession/>
                    </CastVotesHistoryContextProvider>
                </EventMonitorContextProvider>
            }
        </>
    );
}

function InnerEventSession() {

    const params = useParams();
    const { event }  = useEvent(params.eventId!);

    const [ dialogState, setDialogState ] = useState<VotingDialogState>({
        visibleDialog: 'NONE',
        motionId: null,
        previousVotingStartedNotifications: [],
        previousVotingEndedNotifications: [],
    });

    const setDialogStateWithLogging = (dialogState: VotingDialogState) => {
        setDialogState(dialogState);
    }

    useVotingStartEndNotifications(dialogState, setDialogStateWithLogging);

    const openPreviewDialog = (motion: IVoting) => {
        if (motion.id) {
            setDialogState({
                ...dialogState,
                visibleDialog: 'SHOW_PREVIEW',
                motionId: motion.id
            });
        }
    }

    const openVoteDialog = (motion: IVoting) => {
        if (motion.id) {
            setDialogState({
                ...dialogState,
                visibleDialog: 'VOTING',
                motionId: motion.id
            });
        }
    }

    const openResultDialog = (motion: IVoting) => {
        if (motion.id) {
            setDialogState({
                ...dialogState,
                visibleDialog: 'SHOW_RESULTS',
                motionId: motion.id
            });
        }
    }

    return (
        <>
                    <Container maxWidth="md">
                        <EventStatusBar/>
                        <Stack
                            sx={{
                                py:4,
                                borderColor:"text-secondary",
                                borderTopStyle:"solid",
                                borderTopWidth:1,
                            }}
                        >
                <MotionList motions={event!.motions!} onPreview={openPreviewDialog} onVote={openVoteDialog} onViewResults={openResultDialog} disabled={dialogState.visibleDialog !== 'NONE'}/>
                        </Stack>
                    </Container>
                    {
                        event &&
                        <VoteDialogs event={event} dialogState={dialogState} setDialogState={setDialogState} />
                    }
        </>
    )
}
