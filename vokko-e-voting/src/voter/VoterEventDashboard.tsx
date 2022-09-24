import React from 'react';
import VokkoHeader from "../header/VokkoHeader";
import EventList from "../event/EventList";
import {Container} from "@mui/material";
import {useNavigate} from "react-router-dom";
import { Event } from "../api/model/event";
import {isFutureEvent, isPastEvent, isToday} from "../event/eventUtils";
import {useAllEvents} from "../api/persistence";

export default function VoterEventDashboard() {

    //const [{ data } ] = useAxios<GetAllEventsResponseDocument>('events');
    const { events } = useAllEvents();

    const futureEvents  = events.filter(e => isFutureEvent(e));
    const currentEvents = events.filter(e => isToday(e));
    const pastEvents    = events.filter(e => isPastEvent(e));

    const navigate = useNavigate();

    const joinVokkoEvent = (vokkoEvent: Event) => {
        navigate(`/voter/event-session/${vokkoEvent.id}`);
    };

    const viewVokkoEventResults = (vokkoEvent: Event) => {
        navigate(`/voter/event-session/${vokkoEvent.id}`);
    };

    const viewVokkoEventPreview = (vokkoEvent: Event) => {
//        alert(`Navigate to: /voter/event-preview/${vokkoEvent.id}`)
        navigate(`/voter/event-session/${vokkoEvent.id}`);
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
