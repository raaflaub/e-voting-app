import React from 'react';
import NotificationDialog from "./NotificationDialog";
import VoteOnMotionDialog from "./VoteOnMotionDialog";
import {IVoting} from "../api/model/ivoting";

export type VotingFlowState = 'NO_VOTE' | 'NOTIFY_START' | 'VOTING' | 'WAIT_FOR_COMPLETION' | 'NOTIFY_ENDED' | 'SHOW_RESULTS';
export type VoteDialogsProps = {
    motion: IVoting;
    votingFlowState: VotingFlowState;
    setVotingFlowState: (votingFlowState: VotingFlowState) => void;
}

export default function VoteDialogs({ motion, votingFlowState, setVotingFlowState }: VoteDialogsProps) {
    return (
        <>
            <NotificationDialog
                open={votingFlowState === 'NOTIFY_START'}
                onClose={(actionClicked: boolean) => setVotingFlowState(actionClicked ? 'VOTING' : 'WAIT_FOR_COMPLETION')}
                caption="Minutes 2021"
                actionTitle="Abstimmen"
                primary={true}
            >
                Abstimmung wurde gestartet
            </NotificationDialog>
            <VoteOnMotionDialog
                open={votingFlowState === 'VOTING'}
                onClose={() => setVotingFlowState(/*'WAIT_FOR_COMPLETION'*/ 'NOTIFY_ENDED')}
                motion={motion}
            />
            <NotificationDialog
                open={votingFlowState === 'NOTIFY_ENDED'}
                onClose={(actionClicked: boolean) => setVotingFlowState(actionClicked ? 'SHOW_RESULTS' : 'NO_VOTE')}
                caption="Minutes 2021"
                actionTitle="Resultate"
            >
                Abstimmung wurde beendet
            </NotificationDialog>
        </>
    );
}
