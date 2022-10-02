import React from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import {IVoting} from "../api/model/ivoting";
import {Button} from "@mui/material";
import MotionStatusBar from "../motion/MotionStatusBar";
import {ResultBar} from "../results/ResultBar";

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
                    { motion.description }
                </Typography>
                <ResultBar options={motion.options!} />
            </CardContent>

        </Card>
    );
}
