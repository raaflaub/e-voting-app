import React from 'react';
import {IVoting} from "../api/model/ivoting";
import {Typography} from "@mui/material";

export type VoteResultsProps = { motion: IVoting }

export default function VoteResults({ motion }: VoteResultsProps) {
    return (
        <Typography variant="body2">
            Resultate: {JSON.stringify(motion.options)}
        </Typography>
    );
}
