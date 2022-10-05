import React, {ReactNode} from 'react';
import {Stack} from "@mui/material";
import OrganizerMotionListItem from "./OrganizerMotionListItem";
import {IVoting} from "../api/model/ivoting";

export type OrganizerMotionListProps = {
    motions: IVoting[];
    actionTitle?: string | null;
    onAction?: (motion: IVoting) => void;
    onStartVote?: (durationMinutes: number) => void;
    voteDurationMinutes?: number;
    setVoteDurationMinutes?: (value: number) => void;
    header?: ReactNode;
    footer?: ReactNode;
}

export default function OrganizerMotionList({ motions, actionTitle, onAction, voteDurationMinutes, setVoteDurationMinutes, onStartVote, header, footer }: OrganizerMotionListProps) {
    return (
        <>
            <Stack spacing={2} mb={5}>
                {
                    header
                }
                {
                    motions.map(
                        motion =>
                            <OrganizerMotionListItem
                                key={motion.id}
                                motion={motion}
                                actionTitle={actionTitle}
                                onAction={onAction}
                                voteDurationMinutes={voteDurationMinutes}
                                setVoteDurationMinutes={setVoteDurationMinutes}
                                onStartVote={onStartVote}
                            />
                    )
                }
                {
                    footer
                }
            </Stack>
        </>
    );
}
