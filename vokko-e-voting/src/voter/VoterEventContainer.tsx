import React from 'react';
import VokkoHeader from "../header/VokkoHeader";
import {useParams} from "react-router-dom";
import EventMonitorContextProvider from "../provider/EventMonitorContextProvider";
import {useEvent} from "../api/persistence";
import CastVotesHistoryContextProvider from "../provider/CastVotesHistoryContextProvider";
import VoterEventSession from "./VoterEventSession";

export default function VoterEventContainer() {

    const params = useParams();
    const { event }  = useEvent(params.eventId!);

    return (
        <>
            <VokkoHeader title={event?.title} userProfile={true} />
            {
                event &&
                <EventMonitorContextProvider eventId={event.id!}>
                    <CastVotesHistoryContextProvider>
                    <VoterEventSession/>
                    </CastVotesHistoryContextProvider>
                </EventMonitorContextProvider>
            }
        </>
    );
}

