import React, {useState} from 'react';
import {Box, Container, Tab, Tabs} from "@mui/material";
import VokkoHeader from "../header/VokkoHeader";
import {Outlet, useParams} from "react-router-dom";
import OrganizerEventTabs, {OrganizerTab} from "./OrganizerEventTabs";
import {isToday, isFutureEvent, isPastEvent} from "../event/eventUtils";
import OrganizerEventSetup from "../setup/OrganizerEventSetup";
import Loading from "../landing/Loading";
import {useEvent} from "../api/persistence";
import OrganizerEventPresentation from "./OrganizerEventPresentation";

export type OrganizerEventDetailsProps = {}

export default function OrganizerEventDetails({}: OrganizerEventDetailsProps) {

    const [activeTab, setActiveTab] = useState<OrganizerTab>('setup');

    const params = useParams();
    const { event }  = useEvent(params.eventId!);

    return (
        <>
            <VokkoHeader title={event?.title} backButton={true} userProfile={true} />
            <OrganizerEventTabs
                activeTab={activeTab}
                onActiveTabChange={setActiveTab}
                setupEnabled={Boolean(event)}
                liveEnabled={Boolean(event && (isToday(event)))}
                resultsEnabled={Boolean(event && (isToday(event) || isPastEvent(event)))}
            />
            {
                event && activeTab === 'setup' &&
                <OrganizerEventSetup event={event} />
            }
            {
                event && activeTab === 'live' &&
                <OrganizerEventPresentation event={event} />
            }
            {
                (!event || activeTab === 'results') &&
                <Loading text="implementing..."/>
            }
        </>
    );
}

