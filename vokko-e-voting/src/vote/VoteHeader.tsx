import React from 'react';
import {IVoting} from "../api/model/ivoting";
import {Typography} from "@mui/material";
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
            <Card variant="outlined" sx={{ /*backgroundColor: "#f5f5f5"*/ }}>
                <CardContent>
                    {
                        //motion.question &&
                        <Typography variant="h6" mb={2}>
                            {motion.question || "here would be the question"}
                        </Typography>
                    }
                    {
                        //motion.description &&
                        <Typography variant="body2">
                            {motion.description || "here would be the description"}
                        </Typography>
                    }
                </CardContent>
                <CardActions>
                    {
                        (votingState !== 'IN_PROGRESS') &&
                        <MotionStatusBar motion={motion}/>
                    }
                    {
                        (votingState === 'IN_PROGRESS') &&
                        <VoteProgress startDate={motion.startDate!} endDate={motion.endDate!}/>
                    }
                </CardActions>
            </Card>
        </>
    );
}
