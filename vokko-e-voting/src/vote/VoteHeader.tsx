import React from 'react';
import {IVoting} from "../api/model/ivoting";
import Card from "@mui/material/Card";
import {CardHeader, Typography} from "@mui/material";
import VoteProgress from "./VoteProgress";
import {VotingState} from "./voteUtils";

export type VoteHeaderProps = { motion: IVoting, votingState: VotingState }

export default function VoteHeader({ motion, votingState }: VoteHeaderProps) {
    return (
        <>
            <Typography variant="h6">
                {motion.description || "description"}
            </Typography>
            {
                (votingState !== 'INPROGRESS') &&
                <Typography variant="subtitle1">
                    {votingState}
                </Typography>
            }
            {
                (votingState === 'INPROGRESS') &&
                <VoteProgress endDate={motion.endDate!} />
            }
        </>
    );
}
