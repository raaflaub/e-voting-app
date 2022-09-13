import React from 'react';
import VokkoHeader from "../header/VokkoHeader";
import {useParams} from "react-router-dom";
import {allEvents} from "../model/vokkoEvents";
import MotionList from "../motion/MotionList";
import {Container} from "@mui/material";
import EventMonitorContextProvider from "../provider/EventMonitorContextProvider";
import EventStatusBar from "../event/EventStatusBar";

export default function VoterEventSession() {
    const params = useParams();
    const currentEvent = allEvents.find(e => e.id === params.eventId!);

    return (
        <>
            <EventMonitorContextProvider eventId="b3d3c93c-dac3-4a7a-8b8a-1a219ed46b3d">
                <VokkoHeader title={currentEvent!.title} />
                <Container maxWidth="md">
                    <EventStatusBar />
                    <MotionList motions={currentEvent!.motions} />
                </Container>
            </EventMonitorContextProvider>
        </>
    );
}
