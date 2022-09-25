import React from 'react';
import {Button, CircularProgress, Container, Stack, Typography} from "@mui/material";
import {Event} from "../api/model/event";
import {useParams} from "react-router-dom";
import {useResetEventsMutation} from "../api/persistence";

export type OrganizerEventSetupProps = { event: Event }

export default function OrganizerEventSetup({ event }: OrganizerEventSetupProps) {

    const params = useParams();

    const completeToDoMutation = useResetEventsMutation();

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
                    disabled={ completeToDoMutation.isLoading || completeToDoMutation.isError}
                    onClick={(e) => completeToDoMutation.mutate([]) }>Reset
                </Button>
                <Typography>
                    event = { JSON.stringify(event) }
                </Typography>
            </Stack>
        </Container>
    );
}
