import React from 'react';
import {IVoting} from "../api/model/ivoting";
import {Typography} from "@mui/material";
import VoteProgress from "./VoteProgress";
import {getVoteResultState} from "./voteUtils";
import MotionStatusBar from "../motion/MotionStatusBar";

export type VoteHeaderProps = { motion: IVoting }

export default function VoteHeader({ motion }: VoteHeaderProps) {
    const votingState = getVoteResultState(motion);
    return (
        <>
            <Typography variant="h6">
                {motion.question || "here would be the question"}
            </Typography>
            {
                (votingState !== 'IN_PROGRESS') &&
                <MotionStatusBar motion={motion} />
            }
            {
                (votingState === 'IN_PROGRESS') &&
                <VoteProgress startDate={motion.startDate!} endDate={motion.endDate!} />
            }
        </>
    );
}
