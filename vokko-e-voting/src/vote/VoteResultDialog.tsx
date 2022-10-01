import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {IVoting} from "../api/model/ivoting";
import VoteHeader from "./VoteHeader";
import VoteResults from "./VoteResults";

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
            {
                motion &&
                <DialogContent>
                    <VoteHeader motion={motion} />
                    <VoteResults motion={motion} />
                </DialogContent>
            }
        </Dialog>
    );
}
