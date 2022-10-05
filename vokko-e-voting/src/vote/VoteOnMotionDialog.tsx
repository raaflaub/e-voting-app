import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {Alert, IconButton, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from '@mui/icons-material/Send';
import {IVoting} from "../api/model/ivoting";
import VoteOptionsControl from "./VoteOptionsControl";
import {useContext, useEffect, useState} from "react";
import {getVotingStartTag} from "../event/eventUtils";
import {isYesNoVote} from "./voteUtils";
import {useCastVoteMutation} from "../api/persistence";
import {UserContext} from "../provider/UserContextProvider";
import LoadingButton from '@mui/lab/LoadingButton';
import {useSignVote} from "./signVote";
import {CastVotesHistoryContext} from "../provider/CastVotesHistoryContextProvider";
import Button from "@mui/material/Button";
import VoteCard from "./VoteCard";
import {useTranslation} from "react-i18next";


export type VoteOnMotionDialogProps = {
    open: boolean;
    onClose: () => void;
    motion: IVoting | null;
    isTieBreakVote?: boolean;
}

export default function VoteOnMotionDialog({ open, onClose, motion, isTieBreakVote } : VoteOnMotionDialogProps) {

    const {t} = useTranslation();
    const thisVote = motion? getVotingStartTag(motion): null;
    const [castedVote, setCastedVote] = useState<string|null>(null);
    const castVotesHistory = useContext(CastVotesHistoryContext);

    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const castVoteMutation = useCastVoteMutation();
    const user = useContext(UserContext);
    const signVote = useSignVote(user);

    const castVote = () => {
        const castVoteRequestData = {
            userId: user.value?.user?.userId,
            votingId: motion?.id,
            optionId: selectedOptions[0],
            signature: null
        }
        signVote.sign(castVoteRequestData);
    }


    useEffect(() => {
        if (castedVote !== null && castedVote !== thisVote) {
            setCastedVote(null);  // tag zuruecksetzen
        }
    }, [thisVote, castedVote]);

    useEffect(() => {
        if (!castedVote) {
            if (castVoteMutation.isSuccess && castVoteMutation.data) {
                console.log('VOTE SUCCESSFULLY CASTED');
                setCastedVote(thisVote);
                castVotesHistory.addCastVote(thisVote);  // verhindern, dass man zweimal ueber dasselbe abstimmen kann

            } else if (signVote.isSuccess && signVote.signedVoteRequest && !castVoteMutation.isLoading && !castVoteMutation.isError) {
                console.log('SENDING SIGNED VOTE', JSON.stringify({
                    data: signVote.signedVoteRequest
                })) ;
                castVoteMutation.mutate({
                    data: signVote.signedVoteRequest
                });
            }
        }
    }, [castedVote, thisVote, signVote, castVoteMutation, castVotesHistory]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth={true}
        >
            <DialogTitle>
                {(isTieBreakVote ? `${t("stab_decision")}` : '') + motion?.votingTitle}
                <IconButton
                    onClick={() => { onClose(); }}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            {
                motion &&
                <>

                    <DialogContent>
                        <VoteCard
                            motion={motion}
                            isTieBreakVote={isTieBreakVote}
                            collapsed={castedVote === thisVote}
                            collapsedSize="92px"
                            collapsedContent={
                                <>
                                    {
                                        !isTieBreakVote &&
                                        <Typography variant="body2" color="text.secondary">
                                            {t("thanks")} {t("message_result_display1")} {motion.options && isYesNoVote(motion.options)? `${t("vote")}`:`${t("election")}`} {t("message_result_display2")}.
                                        </Typography>
                                    }
                                    {
                                        isTieBreakVote &&
                                        <Typography variant="body2" color="text.secondary">
                                            {t("thanks")}
                                        </Typography>
                                    }
                                </>
                            }
                    >
                            <VoteOptionsControl options={motion.options ?? []} voteOptionCount={1} onSelectionChanged={setSelectedOptions} disabled={signVote.isLoading || castVoteMutation.isLoading}/>
                        </VoteCard>
                    </DialogContent>
                    <DialogActions sx={{ m: 0, p: 2 }}>
                        {
                            (castedVote !== thisVote) &&
                            <LoadingButton
                                variant="contained"
                                onClick={() => castVote()}
                                loading={signVote.isLoading || castVoteMutation.isLoading}
                                loadingPosition="end"
                                endIcon={<SendIcon />}
                                disabled={selectedOptions.length !== 1 || castVotesHistory.hasCastVote(thisVote)}
                            >
                                Senden
                            </LoadingButton>
                        }
                        {
                            (castedVote === thisVote) &&
                            <Button onClick={() => { onClose(); }}>{t("close")}</Button>
                        }
                    </DialogActions>
                </>
            }
            {
                signVote.isError &&
                <Alert severity="error">{t("error_signing_vote")}: {signVote.error?.toString()}</Alert>
            }
            {
                castVoteMutation.isError &&
                <Alert severity="error">{t("error_sending_vote")}: {castVoteMutation.error?.toString()}</Alert>
            }
        </Dialog>
    );
}
