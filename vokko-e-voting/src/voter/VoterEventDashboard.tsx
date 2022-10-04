import React from 'react';
import VokkoHeader from "../header/VokkoHeader";
import EventList from "../event/EventList";
import {Container} from "@mui/material";
import {useNavigate} from "react-router-dom";
import { Event } from "../api/model/event";
import {isFutureEvent, isPastEvent, isToday} from "../event/eventUtils";
import {useAllEvents} from "../api/persistence";
import {useTranslation} from "react-i18next";

export default function VoterEventDashboard() {

    const {t} = useTranslation();
    const { events } = useAllEvents();

    const futureEvents  = events.filter(e => isFutureEvent(e));
    const currentEvents = events.filter(e => isToday(e));
    const pastEvents    = events.filter(e => isPastEvent(e));

    const navigate = useNavigate();

    const joinVokkoEvent = (vokkoEvent: Event) => {
        navigate(`/voter/event-session/${vokkoEvent.id}`);
    };

    const viewVokkoEventResults = (vokkoEvent: Event) => {
        navigate(`/voter/event-results/${vokkoEvent.id}`);
    };

    const viewVokkoEventPreview = (vokkoEvent: Event) => {
        navigate(`/voter/event-session/${vokkoEvent.id}`);
    };

    return (
        <>
            <VokkoHeader title={t("overview")} backButton={false} userProfile={true} />
            <Container maxWidth="md">
                {
                    futureEvents && (futureEvents.length > 0) &&
                    <EventList
                        title={t("future_events")}
                        events={futureEvents}
                        actionTitle={t("preview")}
                        onAction={viewVokkoEventPreview}
                    />
                }
                {
                    currentEvents && (currentEvents.length > 0) &&
                    <EventList
                        title={t("current_events")}
                        events={currentEvents}
                        actionTitle={t("participate")}
                        onAction={joinVokkoEvent}
                        primary={true}
                    />
                }
                {
                    pastEvents && (pastEvents.length > 0) &&
                    <EventList
                        title={t("past_events")}
                        events={pastEvents}
                        actionTitle={t("results")}
                        onAction={viewVokkoEventResults}
                    />
                }
            </Container>
        </>
    );
}
