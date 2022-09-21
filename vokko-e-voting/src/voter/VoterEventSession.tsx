import React, {useState} from 'react';
import VokkoHeader from "../header/VokkoHeader";
import {useParams} from "react-router-dom";
import MotionList from "../motion/MotionList";
import {Button, Container} from "@mui/material";
import EventMonitorContextProvider from "../provider/EventMonitorContextProvider";
import EventStatusBar from "../event/EventStatusBar";
import {useEvent} from "../api/persistence";
import NotificationDialog from "../vote/NotificationDialog";
import VoteOnMotionDialog from "../vote/VoteOnMotionDialog";
import VoteDialogs, {VotingFlowState} from "../vote/VoteDialogs";

export default function VoterEventSession() {

    const params = useParams();
    const { event }  = useEvent(params.eventId!);


    const [ votingFlowState, setVotingFlowState ] = useState<VotingFlowState>('NOTIFY_START');

    return (
        <>
            <VokkoHeader title={event?.title} />
            {
                event &&
                <EventMonitorContextProvider eventId={event.id! /*"b3d3c93c-dac3-4a7a-8b8a-1a219ed46b3d"*/}>
                    <Container maxWidth="md">
                        <EventStatusBar/>
                        <MotionList motions={event.motions!}/>
                    </Container>
                    {
                        event?.motions && event?.motions.length > 0 &&
                        <VoteDialogs motion={event?.motions[0]} votingFlowState={votingFlowState} setVotingFlowState={setVotingFlowState} />
                    }
                </EventMonitorContextProvider>
            }
        </>
    );
}
