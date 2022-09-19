import React from 'react';
import VokkoHeader from "../header/VokkoHeader";
import {useParams} from "react-router-dom";
import {Container} from "@mui/material";
import MotionList from "../motion/MotionList";
import {useEvent} from "../api/persistence";

export default function VoterEventResults() {

    const params = useParams();
    const { event }  = useEvent(params.eventId!);

    return (
        <>
            <VokkoHeader title={event?.title} />
            <Container maxWidth="md">
                {
                    event && event.motions &&
                    <MotionList motions={event.motions}/>
                }
            </Container>
        </>
    );
}
