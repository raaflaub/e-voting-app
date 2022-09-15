import React from 'react';
import VokkoHeader from "../header/VokkoHeader";
import {useParams} from "react-router-dom";
import {Event} from "../api/model/event";
import MotionList from "../motion/MotionList";
import {Container} from "@mui/material";
import EventMonitorContextProvider from "../provider/EventMonitorContextProvider";
import EventStatusBar from "../event/EventStatusBar";
import useAxios from "axios-hooks";

export default function VoterEventSession() {

    const params = useParams();
    const [{ data} ] = useAxios< { data: Event } >(`events/${params.eventId!}`);
    const event = data?.data;

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
