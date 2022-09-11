import React from 'react';
import VokkoHeader from "../header/VokkoHeader";
import VokkoEventList from "../event/VokkoEventList";
import {Container} from "@mui/material";
import {Outlet} from "react-router-dom";
import {currentEvents, Event, pastEvents} from "../model/vokkoEvents";

export type VoterEventDashboardProps = {}

export default function VoterEventDashboard({}: VoterEventDashboardProps) {

    const joinVokkoEvent = (vokkoEvent: Event) => {
        alert(`joining event vokkoEvent.title`);
    };

    const viewVokkoEventResults = (vokkoEvent: Event) => {
        alert(`viewing event details vokkoEvent.title`);
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
                    <VokkoEventList title="Aktuelle Events" events={currentEvents} onDetail={viewVokkoEventResults} />
                }
            </Container>
        </>
    );
}
