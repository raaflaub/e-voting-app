import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {IconButton, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {IVoting} from "../api/model/ivoting";
import VoteOptions from "./VoteOptions";
import VoteHeader from "./VoteHeader";
import {useEffect, useState} from "react";
import {getVotingStartTag} from "../event/eventUtils";
import CategoryTitle from "../layout/CategoryTitle";
import {isYesNoVote} from "./voteUtils";

export type VoteOnMotionDialogProps = {
    open: boolean;
    onClose: () => void;
    motion: IVoting | null;
}

export default function VoteOnMotionDialog({ open, onClose, motion } : VoteOnMotionDialogProps) {

    const thisVote = motion? getVotingStartTag(motion): null;
    const [castedVote, setCastedVote] = useState<string|null>(null);

    const [selectedOption, setSelectedOption] = useState<string|null>(null);

    useEffect(() => {
        if (castedVote !== null && castedVote !== thisVote) {
            setCastedVote(null);  // tag zuruecksetzen
        }
    }, [thisVote, castedVote]);

    function castVote() {
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
                        <Button variant="contained" onClick={() => castVote()} disabled={selectedOption===null}>Senden</Button>
                    </DialogActions>
                </>
            }
        </Dialog>
    );
}
