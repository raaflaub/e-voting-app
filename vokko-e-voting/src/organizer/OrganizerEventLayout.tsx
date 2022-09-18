import React, {useState} from 'react';
import {Box, Container, Tab, Tabs} from "@mui/material";
import VokkoHeader from "../header/VokkoHeader";
import {Outlet, useParams} from "react-router-dom";
import useAxios from "axios-hooks";
import {Event} from "../api/model/event";
import OrganizerEventTabs from "./OrganizerEventTabs";
import {isCurrentEvent, isPastEvent} from "../event/eventUtils";

export type OrganizerEventLayoutProps = {}

export default function OrganizerEventLayout({}: OrganizerEventLayoutProps) {

    const params = useParams();
    const [{ data} ] = useAxios< { data: Event } >(`events/${params.eventId!}`);
    const event = data?.data;

    const [ tabIndex, setTabIndex] = useState(1);

    return (
        <>
            <VokkoHeader title={event?.title} backButton={true} userProfile={true} />
            <OrganizerEventTabs
                basePath="/organizer/events/:eventId"
                setupEnabled={true}
                liveEnabled={Boolean(event && isCurrentEvent(event))}
                resultsEnabled={Boolean(event && (isCurrentEvent(event) || isPastEvent(event)))}
            />
            <Outlet />
        </>
    );
}

