import React from 'react';
import VokkoHeader from "../header/VokkoHeader";
import {useParams} from "react-router-dom";
import {Container, Typography} from "@mui/material";
import {useEvent} from "../api/persistence";
import {getVoteResultState} from "../vote/voteUtils";
import OrganizerResultList from "../organizer/OrganizerResultList";

export default function VoterEventResults() {

    const params = useParams();
    const { event }  = useEvent(params.eventId!);

    const motionsWithResults = event?.motions?.filter(
        m => ['COMPLETED', 'ACCEPTED', 'REJECTED', 'DRAW'].includes(getVoteResultState(m))
    );

    return (
        <>
            <VokkoHeader title={event?.title} />
            <Container maxWidth="md">
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
            </Container>
        </>
    );
}
