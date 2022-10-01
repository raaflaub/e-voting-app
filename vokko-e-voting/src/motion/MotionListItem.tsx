import React, {useContext} from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import {IVoting} from "../api/model/ivoting";
import {Button} from "@mui/material";
import {getVoteResultState, isYesNoVote} from "../vote/voteUtils";
import VoteProgress from "../vote/VoteProgress";
import {getVotingStartTag} from "../event/eventUtils";
import {CastVotesHistoryContext} from "../provider/CastVotesHistoryContextProvider";
import MotionStatusBar from "./MotionStatusBar";

export type MotionListItemProps = {
    motion: IVoting;
    onPreview?: (motion: IVoting) => void;
    onVote?: (motion: IVoting) => void;
    onViewResults?: (motion: IVoting) => void;
    disabled?: boolean;
}

export default function MotionListItem({ motion, onPreview, onVote, onViewResults, disabled }: MotionListItemProps) {
    const voteResultState = getVoteResultState(motion);
    const showProgress = (voteResultState === 'IN_PROGRESS') && (!disabled);

    const castVotesHistory = useContext(CastVotesHistoryContext);
    const hasCastVote = castVotesHistory.hasCastVote(getVotingStartTag(motion));
    const showResultsDisabled = disabled || (voteResultState === 'IN_PROGRESS');

    return (
        <Card sx={{backgroundColor: "#f5f5f5"}}>
            <CardContent>
                <Typography variant="h6" component="div">
                    { motion.votingTitle }
                </Typography>
                {
                    showProgress &&
                    <VoteProgress startDate={motion.startDate!} endDate={motion.endDate!} />
                }
                {
                    !showProgress &&
                    <MotionStatusBar motion={motion} />
                }
                <Typography color="text.secondary">
                    { motion.description }
                </Typography>
            </CardContent>
            {   (onPreview || onVote || onViewResults) &&
                <CardActions sx={{display: 'flex', justifyContent: 'end'}}>
                    {
                        onPreview && (voteResultState === 'PENDING') &&
                        <Button onClick={(e) => onPreview(motion)} disabled={disabled}>Vorschau</Button>
                    }
                    {
                        onVote && (voteResultState === 'IN_PROGRESS') && !hasCastVote &&
                        <Button variant="contained" onClick={(e) => onVote(motion)} disabled={disabled}>
                            { motion.options && isYesNoVote(motion.options) ? "Abstimmen" : "Wählen" }
                        </Button>
                    }
                    {
                        onViewResults &&
                        (voteResultState === 'COMPLETED' || voteResultState === 'ACCEPTED'
                            || voteResultState === 'REJECTED' || voteResultState === 'DRAW'
                            || ((voteResultState === 'IN_PROGRESS') && hasCastVote)) &&
                        <Button onClick={(e) => onViewResults(motion)} disabled={showResultsDisabled}>Resultat</Button>
                    }
                </CardActions>
            }
        </Card>
    );
}
