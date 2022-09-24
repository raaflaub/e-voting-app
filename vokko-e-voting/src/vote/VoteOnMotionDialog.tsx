import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {IconButton, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {IVoting} from "../api/model/ivoting";
import VoteOptions from "./VoteOptions";
import VoteHeader from "./VoteHeader";
import {useContext, useEffect, useState} from "react";
import {getVotingStartTag} from "../event/eventUtils";
import CategoryTitle from "../layout/CategoryTitle";
import {isYesNoVote} from "./voteUtils";
import {useCastVoteMutation} from "../api/persistence";
import {UserContext} from "../provider/UserContextProvider";
import LoadingButton from '@mui/lab/LoadingButton';

export type VoteOnMotionDialogProps = {
    open: boolean;
    onClose: () => void;
    motion: IVoting | null;
}

export default function VoteOnMotionDialog({ open, onClose, motion } : VoteOnMotionDialogProps) {

    const thisVote = motion? getVotingStartTag(motion): null;
    const [castedVote, setCastedVote] = useState<string|null>(null);

    const [selectedOption, setSelectedOption] = useState<string|null>(null);

    const castVoteMutation = useCastVoteMutation();
    const user = useContext(UserContext);

    if (castVoteMutation.isLoading) {
        console.log('castVoteMutation.isLoading', castVoteMutation.status);
    }

    if (castVoteMutation.data) {
        console.log('castVoteMutation.data', castVoteMutation.status, JSON.stringify(castVoteMutation.data));
    }

    if (castVoteMutation.isPaused) {
        console.log('castVoteMutation.isPaused', castVoteMutation.status);
    }

    if (castVoteMutation.isError) {
        console.log('castVoteMutation.isError', castVoteMutation.status, castVoteMutation.error, castVoteMutation.failureCount);
    }

    if (castVoteMutation.isIdle) {
        console.log('castVoteMutation.isIdle', castVoteMutation.status);
    }

    if (castVoteMutation.isSuccess) {
        console.log('castVoteMutation.isSuccess', castVoteMutation.status);
    }




    useEffect(() => {
        if (castedVote !== null && castedVote !== thisVote) {
            setCastedVote(null);  // tag zuruecksetzen
        }
    }, [thisVote, castedVote]);



    function castVote() {
        const castVoteRequestData = {
            userId: user.value?.user?.userId,
            votingId: motion?.id,
            optionId: selectedOption,
            signature: 'invalid'
        }
        castVoteMutation.mutate({
            data: castVoteRequestData
        });
        setCastedVote(thisVote);
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth={true}
        >
            <DialogTitle>
                {motion?.votingTitle}
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
                (castedVote === thisVote) &&
                <DialogContent>
                    <VoteHeader motion={motion!} votingState="INPROGRESS" />
                    <CategoryTitle>
                        Vielen Dank!
                    </CategoryTitle>
                    <Typography variant="body2">
                        Die Resultate werden angezeigt, sobald die {motion?.options && isYesNoVote(motion?.options)?"Abstimmung":"Wahl"} beendet ist.
                    </Typography>
                </DialogContent>
            }
            {
                (castedVote !== thisVote) &&
                <>
                    <DialogContent>
                        <VoteHeader motion={motion!} votingState="INPROGRESS" />
                        <VoteOptions motion={motion!} value={selectedOption} onValueChanged={setSelectedOption} />
                    </DialogContent>
                    <DialogActions sx={{ m: 0, p: 2 }}>
                        <LoadingButton variant="contained" onClick={() => castVote()} loading={castVoteMutation.isLoading} disabled={selectedOption===null}>
                            Senden
                        </LoadingButton>
                    </DialogActions>
                </>
            }
        </Dialog>
    );
}
