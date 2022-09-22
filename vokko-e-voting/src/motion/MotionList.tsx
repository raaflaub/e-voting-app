import React from 'react';
import {Stack} from "@mui/material";
import MotionListItem, {MotionListItemProps} from "./MotionListItem";
import {IVoting} from "../api/model/ivoting";

export type MotionListProps = {
    motions: IVoting[];
    actionTitle?: string | null;
    onAction?: (motion: IVoting) => void;
}

export default function MotionList({ motions, actionTitle, onAction }: MotionListProps) {
    return (
        <>
        <Stack spacing={2} mb={5}>
            { motions.map(
                motion =>
                    <MotionListItem
                        key={motion.id}
                        motion={motion}
                        actionTitle={actionTitle}
                        onAction={onAction}
                    />
            ) }
        </Stack>
        </>
    );
}
