import React from 'react';
import SetupSection from "./SetupSection";
import {Button, Typography} from "@mui/material";
import {Event} from "../api/model/event";
import {useResetEventsMutation} from "../api/persistence";
import CategoryTitle from "../layout/CategoryTitle";

export type SetupMotionsProps = { event: Event }

export default function SetupMotions({ event }: SetupMotionsProps) {

    const completeToDoMutation = useResetEventsMutation();

    return (
        <SetupSection>
            <CategoryTitle>Vorlagen</CategoryTitle>
            <Button
                variant="contained"
                disabled={ completeToDoMutation.isLoading || completeToDoMutation.isError}
                onClick={(e) => completeToDoMutation.mutate([]) }>Reset
            </Button>
            <Typography sx={{ height:500, overflow:"scroll"}}>
                event = { JSON.stringify(event) }
            </Typography>
        </SetupSection>
    );
}
