import React from 'react';
import VokkoHeader from "../header/VokkoHeader";
import EventList from "../event/EventList";
import {Container} from "@mui/material";
import {useNavigate} from "react-router-dom";
import { Event } from "../api/model/event";
import { isCurrentEvent, isFutureEvent, isPastEvent } from "../model/vokkoEvents";
import useAxios from "axios-hooks";
import {GetAllEventsResponseDocument} from "../api/model/get-all-events-response-document";

export default function VoterEventDashboard() {

    const [{ data } ] = useAxios<GetAllEventsResponseDocument>('events');

    const futureEvents  = data && data.data && data.data.filter(e => isFutureEvent(e));
    const currentEvents = data && data.data && data.data.filter(e => isCurrentEvent(e));
    const pastEvents    = data && data.data && data.data.filter(e => isPastEvent(e));

    const navigate = useNavigate();

    const joinVokkoEvent = (vokkoEvent: Event) => {
        navigate(`/voter/event-session/${vokkoEvent.id}`);
    };

    const viewVokkoEventResults = (vokkoEvent: Event) => {
        navigate(`/voter/event-results/${vokkoEvent.id}`);
    };

    const viewVokkoEventPreview = (vokkoEvent: Event) => {
        alert(`Navigate to: /voter/event-preview/${vokkoEvent.id}`)
    };

    return (
        <>
            <VokkoHeader title="Übersicht" backButton={false} userProfile={true} />
            <Container maxWidth="md">
                {
                    futureEvents && (futureEvents.length > 0) &&
                    <EventList
                        title="Kommende Events"
                        events={futureEvents}
                        actionTitle="Vorschau"
                        onAction={viewVokkoEventPreview}
                    />
                }
                {
                    currentEvents && (currentEvents.length > 0) &&
                    <EventList
                        title="Aktuelle Events"
                        events={currentEvents}
                        actionTitle="Teilnehmen"
                        onAction={joinVokkoEvent}
                        primary={true}
                    />
                }
                {
                    pastEvents && (pastEvents.length > 0) &&
                    <EventList
                        title="Vergangene Events"
                        events={pastEvents}
                        actionTitle="Resultate"
                        onAction={viewVokkoEventResults}
                    />
                }
            </Container>
        </>
    );
}
