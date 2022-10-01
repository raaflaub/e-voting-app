import React, {ReactNode} from 'react';
import {Stack} from "@mui/material";
import MotionListItem from "./MotionListItem";
import {IVoting} from "../api/model/ivoting";

export type MotionListProps = {
    motions: IVoting[];
    onPreview?: (motion: IVoting) => void;
    onVote?: (motion: IVoting) => void;
    onViewResults?: (motion: IVoting) => void;
    header?: ReactNode;
    footer?: ReactNode;
    disabled?: boolean;
}

export default function MotionList({ motions, onPreview, onVote, onViewResults, header, footer, disabled }: MotionListProps) {
    return (
        <>
        <Stack spacing={2} mb={5}>
            {
                header
            }
            {
                motions.map(
                    motion =>
                        <MotionListItem
                            key={motion.id}
                            motion={motion}
                            onPreview={onPreview}
                            onVote={onVote}
                            onViewResults={onViewResults}
                            disabled={disabled}
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
