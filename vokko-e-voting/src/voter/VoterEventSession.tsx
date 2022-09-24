import React, {useContext, useEffect, useState} from 'react';
import VokkoHeader from "../header/VokkoHeader";
import {useParams} from "react-router-dom";
import MotionList from "../motion/MotionList";
import {Container} from "@mui/material";
import EventMonitorContextProvider from "../provider/EventMonitorContextProvider";
import EventStatusBar from "../event/EventStatusBar";
import {useEvent} from "../api/persistence";
import VoteDialogs from "../vote/VoteDialogs";
import {IVoting} from "../api/model/ivoting";
import {useVotingStartEndNotifications, VotingDialogState} from "../vote/votingStartedEndedNotifications";

export default function VoterEventSession() {

    const params = useParams();
    const { event }  = useEvent(params.eventId!);

    return (
        <>
            <VokkoHeader title={event?.title} />
            {
                event &&
                <EventMonitorContextProvider eventId={event.id!}>
                    <InnerEventSession/>
                </EventMonitorContextProvider>
            }
        </>
    );
}

function InnerEventSession() {

    const params = useParams();
    const { event }  = useEvent(params.eventId!);

    console.log('CC initial');
    const [ dialogState, setDialogState ] = useState<VotingDialogState>({
        visibleDialog: 'NONE',
        motionId: null,
        previousVotingStartedNotifications: [],
        previousVotingEndedNotifications: [],
    });

    const setDialogStateWithLogging = (dialogState: VotingDialogState) => {
        console.log('setDialogState', new Date(), dialogState.visibleDialog, dialogState.motionId, dialogState.previousVotingEndedNotifications);
        setDialogState(dialogState);
    }

    useVotingStartEndNotifications(dialogState, setDialogStateWithLogging);

    const doOnAction = (motion: IVoting) => {
        if (motion.id) {
            setDialogState({
                ...dialogState,
                visibleDialog: 'SHOW_PREVIEW',
                motionId: motion.id
            });
        }
    }

    return (
        <>
                    <Container maxWidth="md">
                        <EventStatusBar/>
                        <MotionList motions={event!.motions!} actionTitle="Preview" onAction={doOnAction}/>
                    </Container>
                    {
                        event &&
                        <VoteDialogs event={event} dialogState={dialogState} setDialogState={setDialogState} />
                    }
        </>
    )
}
