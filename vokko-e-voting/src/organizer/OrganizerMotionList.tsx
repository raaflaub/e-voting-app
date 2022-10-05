import React, {ReactNode} from 'react';
import {Stack} from "@mui/material";
import OrganizerMotionListItem from "./OrganizerMotionListItem";
import {IVoting} from "../api/model/ivoting";

export type OrganizerMotionListProps = {
    motions: IVoting[];
    onPreview?: (motion: IVoting) => void;
    onStartVote?: (motion: IVoting) => void;
    voteDurationMinutes?: number;
    setVoteDurationMinutes?: (value: number) => void;
    onTieBreak?: (motion: IVoting) => void;
    onViewResults?: (motion: IVoting) => void;
    header?: ReactNode;
    footer?: ReactNode;
}

export default function OrganizerMotionList(
    { motions, onPreview, voteDurationMinutes, setVoteDurationMinutes, onStartVote, onTieBreak, onViewResults, header, footer }: OrganizerMotionListProps
) {
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
                                onPreview={onPreview}
                                onStartVote={onStartVote}
                                voteDurationMinutes={voteDurationMinutes}
                                setVoteDurationMinutes={setVoteDurationMinutes}
                                onTieBreak={onTieBreak}
                                onViewResults={onViewResults}
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
