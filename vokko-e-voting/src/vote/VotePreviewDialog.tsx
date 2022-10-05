import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {IVoting} from "../api/model/ivoting";
import VoteOptionsControl from "./VoteOptionsControl";
import VoteCard from "./VoteCard";
import {getNumWinners} from "./voteUtils";

export type VotePreviewDialogProps = {
    open: boolean;
    onClose: () => void;
    motion: IVoting | null;
}

export default function VotePreviewDialog({ open, onClose, motion } : VotePreviewDialogProps) {

    return (
        <Dialog open={open} onClose={onClose} fullWidth={true}>
            <DialogTitle>
                {motion?.votingTitle || "<votingTitle>"}
                <IconButton onClick={() => { onClose(); }} sx={{ position: 'absolute', right: 8, top: 8 }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            {
                motion &&
                <DialogContent>
                    <VoteCard motion={motion}>
                        <VoteOptionsControl options={motion.options ?? []} voteOptionCount={getNumWinners(motion)} disabled />
                    </VoteCard>
                </DialogContent>
            }
        </Dialog>
    );
}
