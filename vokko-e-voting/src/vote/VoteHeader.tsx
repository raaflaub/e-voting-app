import React from 'react';
import {IVoting} from "../api/model/ivoting";
import {Box, Typography} from "@mui/material";
import VoteProgress from "./VoteProgress";
import {getVoteResultState} from "./voteUtils";
import MotionStatusBar from "../motion/MotionStatusBar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

export type VoteHeaderProps = { motion: IVoting }

export default function VoteHeader({ motion }: VoteHeaderProps) {
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
                <CardActions>
                    <Box width="100%" mx="6px" >
                        {
                            (votingState !== 'IN_PROGRESS') &&
                            <MotionStatusBar motion={motion}/>
                        }
                        {
                            (votingState === 'IN_PROGRESS') &&
                            <VoteProgress startDate={motion.startDate!} endDate={motion.endDate!}/>
                        }
                    </Box>
                </CardActions>
            </Card>
        </>
    );
}
