import React from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import {IVoting} from "../api/model/ivoting";

export type MotionListItemProps = {
        motion: IVoting
    }

export default function MotionListItem({  motion }: MotionListItemProps) {
    return (
        <Card sx={{backgroundColor: "#f5f5f5"}}>
            <CardContent>
                <Typography variant="h6" component="div">
                    { motion.votingTitle }
                </Typography>
                <Typography color="text.secondary">
                    { motion.description }
                </Typography>
            </CardContent>
            {
                <CardActions sx={{display: 'flex', justifyContent: 'end'}}>
                    // add expansion here
                </CardActions>
            }
        </Card>
    );
}
