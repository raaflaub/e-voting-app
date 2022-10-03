import React from 'react';
import {Container, Stack, Typography} from "@mui/material";
import {Event} from "../api/model/event";
import EventMonitorContextProvider from "../provider/EventMonitorContextProvider";
import OrganizerResultList from "./OrganizerResultList";
import {getVoteResultState} from "../vote/voteUtils";

export type OrganizerEventResultListProps = { event: Event }

export default function OrganizerEventResultList( {event} :  OrganizerEventResultListProps) {

    const motionsWithResults = event?.motions?.filter(
        m => ['COMPLETED', 'ACCEPTED', 'REJECTED', 'DRAW'].includes(getVoteResultState(m))
    );

    return (
        <Container maxWidth="md">
            <Stack display="flex"
                   marginTop={6}
                   flexDirection="column"
                   justifyContent="center"
                   alignItems="stretch"
                   spacing={4}
            >
                <EventMonitorContextProvider eventId={event.id!}>
                    {
                        !(motionsWithResults?.length) &&
                        <Typography variant="body2" color="text.secondary" sx={{ my: 2, textAlign: "center"}} >
                            Bisher keine Resultate
                        </Typography>
                    }
                    {
                        Boolean(motionsWithResults?.length) &&
                            <OrganizerResultList motions={motionsWithResults ?? []} />
                    }
                </EventMonitorContextProvider>
            </Stack>
        </Container>
    );
}

