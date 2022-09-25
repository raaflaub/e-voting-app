import React from 'react';
import {Stack} from "@mui/material";
import MotionListItem, {MotionListItemProps} from "./MotionListItem";
import {IVoting} from "../api/model/ivoting";

export type MotionListProps = {
    motions: IVoting[];
    onPreview?: (motion: IVoting) => void;
    onVote?: (motion: IVoting) => void;
    onViewResults?: (motion: IVoting) => void;
    disabled?: boolean;
}

export default function MotionList({ motions, onPreview, onVote, onViewResults, disabled }: MotionListProps) {
    return (
        <>
        <Stack spacing={2} mb={5}>
            { motions.map(
                motion =>
                    <MotionListItem
                        key={motion.id}
                        motion={motion}
                        onPreview={onPreview}
                        onVote={onVote}
                        onViewResults={onViewResults}
                        disabled={disabled}
                    />
            ) }
        </Stack>
        </>
    );
}
