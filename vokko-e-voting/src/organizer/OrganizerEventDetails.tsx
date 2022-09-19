import React, {useState} from 'react';
import {Box, Container, Tab, Tabs} from "@mui/material";
import VokkoHeader from "../header/VokkoHeader";
import {Outlet, useParams} from "react-router-dom";
import OrganizerEventTabs, {OrganizerTab} from "./OrganizerEventTabs";
import {isCurrentEvent, isPastEvent} from "../event/eventUtils";
import OrganizerEventSetup from "./OrganizerEventSetup";
import Loading from "../landing/Loading";
import {useEvent} from "../api/persistence";

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
                liveEnabled={Boolean(event && isCurrentEvent(event))}
                resultsEnabled={Boolean(event && (isCurrentEvent(event) || isPastEvent(event)))}
            />
            {
                event && activeTab === 'setup' &&
                <OrganizerEventSetup event={event} />
            }
            {
                (!event || activeTab !== 'setup') &&
                <Loading text="implementing..."/>
            }
        </>
    );
}

