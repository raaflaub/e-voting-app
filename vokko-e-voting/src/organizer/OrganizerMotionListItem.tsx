import React from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import {IVoting} from "../api/model/ivoting";
import {Button} from "@mui/material";
import MotionStatusBar from "../motion/MotionStatusBar";
import {getDescriptionText, getVoteResultState} from "../vote/voteUtils";
import {useTranslation} from "react-i18next";
import StartVoteControl from "../vote/StartVoteControl";
import VoteProgress from "../vote/VoteProgress";

export type OrganizerMotionListItemProps = {
    motion: IVoting;
    onPreview?: (motion: IVoting) => void;
    onStartVote?: (motion: IVoting) => void;
    voteDisabled?: boolean;
    voteDurationMinutes?: number;
    setVoteDurationMinutes?: (value: number) => void;
    onTieBreak?: (motion: IVoting) => void;
    onViewResults?: (motion: IVoting) => void;
}

export default function OrganizerMotionListItem(
    { motion, onPreview, onStartVote, voteDisabled, voteDurationMinutes, setVoteDurationMinutes, onTieBreak, onViewResults }: OrganizerMotionListItemProps
) {

    const {t} = useTranslation();

    const voteResultState = getVoteResultState(motion);
    const showProgress = (voteResultState === 'IN_PROGRESS');

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
                    { getDescriptionText(motion) }
                </Typography>
            </CardContent>
            {   (onPreview || onStartVote || onTieBreak || onViewResults) &&
                <CardActions sx={{display: 'flex', justifyContent: 'end'}}>
                    {
                        onPreview && (voteResultState === 'PENDING') &&
                        <Button onClick={(e) => onPreview(motion)} disabled={voteDisabled}>
                            {t("preview")}
                        </Button>
                    }
                    {
                        onStartVote && (voteResultState === 'PENDING') && voteDurationMinutes && setVoteDurationMinutes &&
                        <StartVoteControl motion={motion}
                                          voteDurationMinutes={voteDurationMinutes}
                                          setVoteDurationMinutes={setVoteDurationMinutes}
                                          onStartVote={onStartVote}
                                          disabled={voteDisabled}
                        />
                    }
                    {
                        onViewResults && ['COMPLETED', 'ACCEPTED', 'REJECTED', 'DRAW'].includes(voteResultState) &&
                        <Button onClick={(e) => onViewResults(motion)} disabled={voteDisabled}>
                            {t("results")}
                        </Button>
                    }
                    {
                        onTieBreak && (getVoteResultState(motion) === 'DRAW') &&
                        <Button variant="contained" onClick={(e) => onTieBreak(motion)} disabled={voteDisabled}>
                            {t("deciding_vote")}
                        </Button>
                    }
                </CardActions>
            }
        </Card>
    );
}
