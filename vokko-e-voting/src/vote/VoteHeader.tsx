import React from 'react';
import {IVoting} from "../api/model/ivoting";
import {Box, Typography} from "@mui/material";
import VoteProgress from "./VoteProgress";
import {getVoteResultState} from "./voteUtils";
import MotionStatusBar from "../motion/MotionStatusBar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export type VoteHeaderProps = {
    motion: IVoting
    isTieBreakVote?: boolean;
}

export default function VoteHeader({ motion, isTieBreakVote }: VoteHeaderProps) {
    const votingState = getVoteResultState(motion);
    return (
        <>
            <Card>
                <CardContent>
                    {
                        //motion.question &&
                        <Typography variant="h6">
                            {motion.question || "<question>"}
                        </Typography>
                    }
                </CardContent>
            </Card>
            <Box width="100%" mx={0.2} mt={3}>
                        {
                            (isTieBreakVote || (votingState !== 'IN_PROGRESS')) &&
                            <MotionStatusBar motion={motion}/>
                        }
                        {
                            !isTieBreakVote && (votingState === 'IN_PROGRESS') &&
                            <VoteProgress startDate={motion.startDate!} endDate={motion.endDate!}/>
                        }
                    </Box>
        </>
    );
}
