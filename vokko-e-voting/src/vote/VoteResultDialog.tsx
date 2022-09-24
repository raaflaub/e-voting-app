import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {IconButton} from "@mui/material";
import {styled} from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import {ReactNode, useState} from "react";
import {IVoting} from "../api/model/ivoting";
import VoteHeader from "./VoteHeader";
import VoteResults from "./VoteResults";
import {VotingOption} from "../api/model/voting-option";
import {getVoteResultState} from "./voteUtils";

export type VoteResultDialogProps = {
    open: boolean;
    onClose: () => void;
    motion: IVoting | null;
}

export default function VoteResultDialog({ open, onClose, motion } : VoteResultDialogProps) {


    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth={true}
        >
            <DialogTitle>
                {motion?.votingTitle || "votingTitle"}
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
            <DialogContent>
                <VoteHeader motion={motion!} votingState={getVoteResultState(motion?.options ?? null)} />
                <VoteResults motion={motion!} />
            </DialogContent>
        </Dialog>
    );
}
