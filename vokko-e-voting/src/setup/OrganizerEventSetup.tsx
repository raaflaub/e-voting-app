import React from 'react';
import {Container, Stack} from "@mui/material";
import {Event} from "../api/model/event";
import SetupParticipants from "./SetupParticipants";
import SetupMotions from "./SetupMotions";

export type OrganizerEventSetupProps = { event: Event }

export default function OrganizerEventSetup({ event }: OrganizerEventSetupProps) {

    return (
        <Container maxWidth="md">
            <Stack direction="column" spacing={2} sx={{ mt: 6, mb: 1}}>
                <SetupParticipants event={event} />
                <SetupMotions event={event} />
            </Stack>
        </Container>
    );
}
