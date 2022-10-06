import React from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {IVoting} from "../api/model/ivoting";
import MotionStatusBar from "../motion/MotionStatusBar";
import {ResultBar} from "../results/ResultBar";
import {getDescriptionText} from "../vote/voteUtils";

export type OrganizerResultListItemProps = {
    motion: IVoting;

}

export default function OrganizerResultListItem({ motion }: OrganizerResultListItemProps) {
    return (
        <Card sx={{backgroundColor: "#f5f5f5"}}>
            <CardContent>
                <Typography variant="h6" component="div">
                    { motion.votingTitle }
                </Typography>
                <MotionStatusBar motion={motion} />
                <Typography color="text.secondary">
                    { getDescriptionText(motion) }
                </Typography>
                <ResultBar options={motion.options!} />
            </CardContent>

        </Card>
    );
}
