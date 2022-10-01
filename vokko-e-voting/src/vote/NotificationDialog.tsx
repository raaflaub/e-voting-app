import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {ReactNode} from "react";

export type VoteStartedDialogProps = {
    open: boolean;
    onClose: (actionClicked: boolean) => void;
    caption: string;
    actionTitle: string;
    primary?: boolean
    children: ReactNode;
}

export default function NotificationDialog({ open, onClose, caption, actionTitle, primary, children } : VoteStartedDialogProps) {

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle>
                {caption}
                <IconButton
                    onClick={() => { onClose(false); }}
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
                <DialogContentText>
                    {children}
                </DialogContentText>
            </DialogContent>
            {
                actionTitle &&
                <DialogActions sx={{ m: 0, p: 2 }}>
                    <Button variant={primary ? "contained" : "text" } onClick={() => { onClose(true); } }>{actionTitle}</Button>
                </DialogActions>
            }
        </Dialog>
    );
}
