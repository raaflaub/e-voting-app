import React from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import {IVoting} from "../api/model/ivoting";
import {Button} from "@mui/material";
import {getVoteResultState, isYesNoVote, VOTING_STATE_TEXTS_DE} from "../vote/voteUtils";
import VoteProgress from "../vote/VoteProgress";
import {getVotingEndTag, getVotingStartTag} from "../event/eventUtils";

export type MotionListItemProps = {
    motion: IVoting;
    onPreview?: (motion: IVoting) => void;
    onVote?: (motion: IVoting) => void;
    onViewResults?: (motion: IVoting) => void;
}

export default function MotionListItem({ motion, onPreview, onVote, onViewResults }: MotionListItemProps) {
    const voteResultState = getVoteResultState(motion);
    return (
        <Card sx={{backgroundColor: "#f5f5f5"}}>
            <CardContent>
                <Typography variant="h6" component="div">
                    { motion.votingTitle }
                </Typography>
                <Typography variant="subtitle1">
                    {VOTING_STATE_TEXTS_DE[voteResultState]}
                </Typography>
                <Typography color="text.secondary">
                    { motion.description }
                </Typography>
            </CardContent>
            {   (onPreview || onVote || onViewResults) &&
                <CardActions sx={{display: 'flex', justifyContent: 'end'}}>
                    {
                        onPreview && (voteResultState === 'PENDING') &&
                        <Button onClick={(e) => onPreview(motion)}>Vorschau</Button>
                    }
                    {
                        onVote && (voteResultState === 'INPROGRESS') &&
                        <Button variant="contained" onClick={(e) => onVote(motion)}>
                            { motion.options && isYesNoVote(motion.options) ? "Abstimmen" : "Wählen" }
                        </Button>
                    }
                    {
                        onViewResults &&
                        (voteResultState === 'COMPLETED' || voteResultState === 'ACCEPTED'
                            || voteResultState === 'REJECTED' || voteResultState === 'TIE') &&
                        <Button onClick={(e) => onViewResults(motion)}>Resultat</Button>
                    }
                </CardActions>
            }
        </Card>
    );
}
