import React from 'react';
import NotificationDialog from "./NotificationDialog";
import VoteOnMotionDialog from "./VoteOnMotionDialog";
import {Event} from "../api/model/event";
import VoteResultDialog from "./VoteResultDialog";
import VotePreviewDialog from "./VotePreviewDialog";
import {getMotionById} from "../event/eventUtils";
import {VotingDialogState} from "./votingStartedEndedNotifications";

export type VoteDialogsProps = {
    event: Event,
    dialogState: VotingDialogState;
    setDialogState: (dialogState: VotingDialogState) => void;
}

export default function VoteDialogs({ event, dialogState, setDialogState }: VoteDialogsProps) {

    const closeDialog = () => {
        setDialogState({...dialogState, visibleDialog: 'NONE', motionId: null})
    }

    const startNotificationDialogClosed = (actionClicked: boolean) => {
        if (actionClicked) {
            // Klick auf "Wählen" bzw. "Abstimmen"
            setDialogState({...dialogState, visibleDialog: 'VOTING'});
        } else {
            // Benutzer hat entschieden, nicht zu waehlen
            closeDialog();
        }
    }

    const endNotificationDialogClosed = (actionClicked: boolean) => {
        if (actionClicked) {
            // Klick auf "Resultate"
            setDialogState({...dialogState, visibleDialog: 'SHOW_RESULTS',});
        } else {
            // Benutzer hat entschieden, die Resultate nicht anzusehen
            closeDialog();
        }
    }

    const motion = getMotionById(event, dialogState.motionId);

    if (!motion) {
        return (<></>)
    }

    return (
        <>
            <NotificationDialog
                open={dialogState.visibleDialog === 'NOTIFY_VOTING_STARTED'}
                onClose={startNotificationDialogClosed}
                caption={motion.votingTitle || ''}
                actionTitle="Abstimmen"
                primary={true}
            >
                Abstimmung wurde gestartet
            </NotificationDialog>

            <VoteOnMotionDialog
                open={dialogState.visibleDialog === 'VOTING'}
                onClose={closeDialog}
                motion={motion}
            />

            <NotificationDialog
                open={dialogState.visibleDialog === 'NOTIFY_VOTING_ENDED'}
                onClose={endNotificationDialogClosed}
                caption={motion.votingTitle || ''}
                actionTitle="Resultat"
            >
                Abstimmung wurde beendet
            </NotificationDialog>

            <VoteResultDialog
                open={dialogState.visibleDialog === 'SHOW_RESULTS'}
                onClose={closeDialog}
                motion={motion}
            />

            <VotePreviewDialog
                open={dialogState.visibleDialog === 'SHOW_PREVIEW'}
                onClose={closeDialog}
                motion={motion}
            />
        </>
    );
}
