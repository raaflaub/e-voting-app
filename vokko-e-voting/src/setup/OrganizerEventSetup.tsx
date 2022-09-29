import React from 'react';
import {Button, Container, Grid, Typography} from "@mui/material";
import {Event} from "../api/model/event";
import {useParams} from "react-router-dom";
import {useResetEventsMutation} from "../api/persistence";
import SetupSection from "./SetupSection";
import SetupParticipants from "./SetupParticipants";
import SetupMotions from "./SetupMotions";

export type OrganizerEventSetupProps = { event: Event }

export default function OrganizerEventSetup({ event }: OrganizerEventSetupProps) {

    const params = useParams();


    return (
        <Container maxWidth="xl">
            <Grid container columns={{ xs: 1, md: 2 }}
                  display="flex"
                  marginTop={6}
                  direction="row"
                  justifyContent="top"
                  alignItems="flex-start"
                  spacing={4}
            >
                <Grid item xs={1}>
                    <SetupParticipants />
                </Grid>
                <Grid item xs={1}>
                    <SetupMotions event={event} />
                </Grid>
            </Grid>
        </Container>
    );
}
