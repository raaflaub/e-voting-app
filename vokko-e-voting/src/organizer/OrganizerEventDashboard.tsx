import React from 'react';
import VokkoHeader from "../header/VokkoHeader";
import EventList from "../event/EventList";
import {Container} from "@mui/material";
import {useNavigate} from "react-router-dom";
import { Event } from "../api/model/event";
import { isToday, isFutureEvent, isPastEvent } from "../event/eventUtils";
import {useAllEvents} from "../api/persistence";

export default function OrganizerEventDashboard() {

    const { events } = useAllEvents();

    const futureEvents  = events.filter(e => isFutureEvent(e));
    const currentEvents = events.filter(e => isToday(e));
    const pastEvents    = events.filter(e => isPastEvent(e));

    const navigate = useNavigate();

    const viewVokkoEventSetup = (vokkoEvent: Event) => {
        navigate(`/organizer/events/${vokkoEvent.id}`);
    };

    const viewVokkoEventResults = (vokkoEvent: Event) => {
        navigate(`/organizer/events/${vokkoEvent.id}`);
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
                        actionTitle="Details"
                        onAction={viewVokkoEventSetup}
                    />
                }
                {
                    currentEvents && (currentEvents.length > 0) &&
                    <EventList
                        title="Aktuelle Events"
                        events={currentEvents}
                        actionTitle="Details"
                        onAction={viewVokkoEventSetup}
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
