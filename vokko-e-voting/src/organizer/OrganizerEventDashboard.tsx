import React, {useState} from 'react';
import VokkoHeader from "../header/VokkoHeader";
import EventList from "../event/EventList";
import {Container, IconButton, Stack} from "@mui/material";
import {useNavigate} from "react-router-dom";
import { Event } from "../api/model/event";
import { isToday, isFutureEvent, isPastEvent } from "../event/eventUtils";
import {useAllEvents, useResetEventsMutation} from "../api/persistence";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {blue} from "@mui/material/colors";
import NewEventForm from "../setup/NewEventForm";
import TimeLineButton from "../layout/TimeLineButton";

export default function OrganizerEventDashboard() {

    const { events } = useAllEvents();
    const resetEventsMutation = useResetEventsMutation();


    const futureEvents  = events.filter(e => isFutureEvent(e));
    const currentEvents = events.filter(e => isToday(e));
    const pastEvents    = events.filter(e => isPastEvent(e));

    const navigate = useNavigate();

    const [ showNewEventForm, setShowNewEventForm ] = useState(false);

    const viewVokkoEventSetup = (vokkoEvent: Event) => {
        navigate(`/organizer/events/${vokkoEvent.id}?tab=setup`);
    };

    const viewVokkoEventResults = (vokkoEvent: Event) => {
        navigate(`/organizer/events/${vokkoEvent.id}?tab=results`);
    };

    return (
        <>
            <VokkoHeader title="Übersicht" backButton={false} userProfile={true} />
            <Container maxWidth="md">
                <Stack direction="row" alignItems="center" justifyContent="center" sx={{ my:4 }} >
                    {
                        !showNewEventForm &&
                        <IconButton size="large" sx={{ color:blue[700] }} onClick={() => setShowNewEventForm(true)}>
                            <AddCircleIcon sx={{ fontSize:"64px" }}/>
                        </IconButton>
                    }
                    {
                        showNewEventForm &&
                        <NewEventForm onClose={() => setShowNewEventForm(false)} />
                    }
                 </Stack>
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
                <TimeLineButton
                    variant="outlined"
                    disabled={ resetEventsMutation.isLoading || resetEventsMutation.isError}
                    onClick={() => resetEventsMutation.mutate([]) }
                >
                    Reset
                </TimeLineButton>
            </Container>
        </>
    );
}
