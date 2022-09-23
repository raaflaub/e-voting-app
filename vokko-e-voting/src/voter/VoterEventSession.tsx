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
import {useVotingDialogState, useVotingStartEndNotifications} from "../vote/votingStartedEndedNotifications";

export default function VoterEventSession() {

    const params = useParams();
    const { event }  = useEvent(params.eventId!);

    const [ dialogState, setDialogState ] = useVotingDialogState();
    useVotingStartEndNotifications(dialogState, setDialogState);

    const doOnAction = (motion: IVoting) => {
        if (motion.id) {
            setDialogState({...dialogState, visibleDialog: 'SHOW_PREVIEW', motionId: motion.id});
        }
    }

    return (
        <>
            <VokkoHeader title={event?.title} />
            {
                event &&
                <EventMonitorContextProvider eventId={event.id!}>
                    <Container maxWidth="md">
                        <EventStatusBar/>
                        <MotionList motions={event!.motions!} actionTitle="Preview" onAction={doOnAction}/>
                    </Container>
                    {
                        event &&
                        <VoteDialogs event={event} dialogState={dialogState} setDialogState={setDialogState} />
                    }
                </EventMonitorContextProvider>
            }
        </>
    );
}

