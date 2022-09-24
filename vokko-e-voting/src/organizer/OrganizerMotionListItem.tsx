import React from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import {IVoting} from "../api/model/ivoting";
import {Button} from "@mui/material";

export type OrganizerMotionListItemProps = {
    motion: IVoting;
    actionTitle?: string | null;
    onAction?: (motion: IVoting) => void;
}

export default function OrganizerMotionListItem({ motion, actionTitle, onAction }: OrganizerMotionListItemProps) {
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
            {   onAction &&
                <CardActions sx={{display: 'flex', justifyContent: 'end'}}>
                    <Button onClick={(e) => onAction(motion)}>{actionTitle}</Button>
                </CardActions>
            }
        </Card>
    );
}
