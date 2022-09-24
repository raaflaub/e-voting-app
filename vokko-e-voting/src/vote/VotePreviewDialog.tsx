import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {IconButton, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import {ReactNode, useState} from "react";
import {IVoting} from "../api/model/ivoting";
import VoteHeader from "./VoteHeader";
import VoteOptionsControl from "./VoteOptionsControl";

export type VotePreviewDialogProps = {
    open: boolean;
    onClose: () => void;
    motion: IVoting | null;
}

export default function VotePreviewDialog({ open, onClose, motion } : VotePreviewDialogProps) {

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
                <VoteHeader motion={motion!} votingState="PENDING" />
                <VoteOptionsControl options={motion?.options ?? []} voteOptionCount={1} disabled />
                {
                    motion?.description &&
                    <Typography variant="subtitle1">
                        INFO: {motion.description}
                    </Typography>
                }
            </DialogContent>
        </Dialog>
    );
}
