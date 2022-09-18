import React from 'react';
import {Button, CircularProgress, Container, Stack, Typography} from "@mui/material";
import {Event} from "../api/model/event";
import {useParams} from "react-router-dom";
import useAxios from "axios-hooks";
import {GetAllEventsResponseDocument} from "../api/model/get-all-events-response-document";

export type OrganizerEventSetupProps = { event: Event }

export default function OrganizerEventSetup({ event }: OrganizerEventSetupProps) {

    const params = useParams();

    const [{ data: resetResultData, loading: resetLoading, error: resetError }, executeReset ]
        = useAxios< GetAllEventsResponseDocument, {} >(
            {
                url: `events/reset`,
                method: 'PATCH'
            },
        { manual: true }
    );
    console.log('reset', JSON.stringify(resetResultData), resetLoading, resetError);

    return (
        <Container maxWidth="sm">
            <Stack display="flex"
                   marginTop={6}
                   flexDirection="column"
                   justifyContent="center"
                   alignItems="center"
                   spacing={4}
            >
                <Button
                    variant="contained"
                    disabled={ resetLoading || Boolean(resetError)}
                    onClick={(e) => executeReset({}) }>Reset
                </Button>
                <Typography>
                    event = { JSON.stringify(event) }
                </Typography>
            </Stack>
        </Container>
    );
}
