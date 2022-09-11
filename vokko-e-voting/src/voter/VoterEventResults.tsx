import React from 'react';
import VokkoHeader from "../header/VokkoHeader";
import {useParams} from "react-router-dom";
import {allEvents} from "../model/vokkoEvents";

export type VoterEventResultsProps = {}

export default function VoterEventResults({}: VoterEventResultsProps) {
    const params = useParams();
    const currentEvent = allEvents.find(e => e.id === params.eventId!);
    return (
        <>
            <VokkoHeader title={ currentEvent!.title } userProfile={true} />
        </>
    );
}
