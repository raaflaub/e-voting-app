import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {IconButton, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {IVoting} from "../api/model/ivoting";
import VoteOptionsControl from "./VoteOptionsControl";
import VoteHeader from "./VoteHeader";
import {useContext, useEffect, useState} from "react";
import {getVotingStartTag} from "../event/eventUtils";
import CategoryTitle from "../layout/CategoryTitle";
import {isYesNoVote} from "./voteUtils";
import {useCastVoteMutation} from "../api/persistence";
import {UserContext} from "../provider/UserContextProvider";
import LoadingButton from '@mui/lab/LoadingButton';
import {useSignVote} from "./signVote";

export type VoteOnMotionDialogProps = {
    open: boolean;
    onClose: () => void;
    motion: IVoting | null;
}

export default function VoteOnMotionDialog({ open, onClose, motion } : VoteOnMotionDialogProps) {

    const thisVote = motion? getVotingStartTag(motion): null;
    const [castedVote, setCastedVote] = useState<string|null>(null);

    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const castVoteMutation = useCastVoteMutation();
    const user = useContext(UserContext);
    const signVote = useSignVote(user.value!);

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

            } else if (signVote.isSuccess && signVote.signedVoteRequest && !castVoteMutation.isLoading && !castVoteMutation.isError) {
                 castVoteMutation.mutate({
                    data: signVote.signedVoteRequest
                });
            }
        }
    }, [castedVote, thisVote, signVote, castVoteMutation]);

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
                        <VoteOptionsControl options={motion?.options ?? []} voteOptionCount={1} onSelectionChanged={setSelectedOptions} />  {/*value = {selectedOption}*/}
            </DialogContent>
            <DialogActions sx={{ m: 0, p: 2 }}>
                        <LoadingButton
                            variant="contained"
                            onClick={() => castVote()}
                            loading={signVote.isLoading || castVoteMutation.isLoading}
                            disabled={selectedOptions.length !== 1}>
                            Senden
                        </LoadingButton>
            </DialogActions>
                </>
            }
        </Dialog>
    );
}
