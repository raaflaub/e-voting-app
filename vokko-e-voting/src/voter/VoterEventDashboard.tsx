import React from 'react';
import VokkoHeader from "../header/VokkoHeader";
import VokkoEventList from "../event/VokkoEventList";
import {Container} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {currentEvents, Event, pastEvents} from "../model/vokkoEvents";

export type VoterEventDashboardProps = {}

export default function VoterEventDashboard({}: VoterEventDashboardProps) {

    const navigate = useNavigate();

    const joinVokkoEvent = (vokkoEvent: Event) => {
        navigate(`/voter/event-session/${vokkoEvent.id}`);
    };

    const viewVokkoEventResults = (vokkoEvent: Event) => {
        navigate(`/voter/event-results/${vokkoEvent.id}`);
    };

    return (
        <>
            <VokkoHeader title="Übersicht" backButton={false} userProfile={true} />
            <Container maxWidth="md">
                {
                    currentEvents && (currentEvents.length > 0) &&
                    <VokkoEventList title="Aktuelle Events" events={currentEvents} onJoin={joinVokkoEvent} />
                }
                {
                    pastEvents && (pastEvents.length > 0) &&
                    <VokkoEventList title="Vergangene Events" events={pastEvents} onDetail={viewVokkoEventResults} />
                }
            </Container>
        </>
    );
}
