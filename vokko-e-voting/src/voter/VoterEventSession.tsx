import React from 'react';
import VokkoHeader from "../header/VokkoHeader";
import {useParams} from "react-router-dom";
import {allEvents} from "../model/vokkoEvents";
import MotionList from "../motion/MotionList";
import {Container} from "@mui/material";

export type VoterEventSessionProps = {}

export default function VoterEventSession({}: VoterEventSessionProps) {
    const params = useParams();
    const currentEvent = allEvents.find(e => e.id === params.eventId!);
    return (
        <>
            <VokkoHeader title={ currentEvent!.title } userProfile={true} />
            <Container maxWidth="md">
            {
                currentEvent &&
                <MotionList motions={currentEvent!.motions} />
            }
            </Container>
        </>
    );
}
