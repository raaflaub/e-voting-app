import React from 'react';
import VokkoHeader from "../header/VokkoHeader";
import {useParams} from "react-router-dom";
import useAxios from "axios-hooks";
import {Event} from "../model/event";
import {Container} from "@mui/material";
import MotionList from "../motion/MotionList";

export default function VoterEventResults() {

    const params = useParams();
    const [{ data} ] = useAxios< { data: Event } >(`events/${params.eventId!}`);
    const event = data?.data;

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
