import React from 'react';
import VokkoHeader from "../header/VokkoHeader";
import {useParams} from "react-router-dom";
import MotionList from "../motion/MotionList";
import {Container} from "@mui/material";
import EventMonitorContextProvider from "../provider/EventMonitorContextProvider";
import EventStatusBar from "../event/EventStatusBar";
import {useEvent} from "../api/persistence";

export default function VoterEventSession() {

    const params = useParams();
    const { event }  = useEvent(params.eventId!);

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
                </EventMonitorContextProvider>
            }
        </>
    );
}
