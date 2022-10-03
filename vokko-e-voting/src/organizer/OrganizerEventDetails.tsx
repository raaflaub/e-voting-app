import React, {useState} from 'react';
import VokkoHeader from "../header/VokkoHeader";
import {useParams, useSearchParams} from "react-router-dom";
import OrganizerEventTabs, {OrganizerTab} from "./OrganizerEventTabs";
import {isToday, isPastEvent} from "../event/eventUtils";
import OrganizerEventSetup from "../setup/OrganizerEventSetup";
import {useEvent} from "../api/persistence";
import OrganizerEventPresentation from "./OrganizerEventPresentation";
import OrganizerEventResultList from "./OrganizerEventResultList";

export default function OrganizerEventDetails() {

    const params = useParams();
    const { event }  = useEvent(params.eventId!);

    const [searchParams] = useSearchParams();
    const initialTab = searchParams.get("tab");
    const [activeTab, setActiveTab] = useState<OrganizerTab>(
        initialTab === 'setup'? 'setup'
        : initialTab === 'results'? 'results'
        : 'live');

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
                (event && activeTab === 'results') &&
                <OrganizerEventResultList event={event} />
            }
        </>
    );
}

