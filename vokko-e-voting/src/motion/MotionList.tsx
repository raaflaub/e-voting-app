import React from 'react';
import {Stack} from "@mui/material";
import MotionListItem, {MotionListItemProps} from "./MotionListItem";
import {IVoting} from "../model/ivoting";

export type MotionListProps = {
    motions: IVoting[]
}

export default function MotionList({ motions }: MotionListProps) {
    return (
        <>
        <Stack spacing={2} mb={5}>
            { motions.map(
                motion =>
                    <MotionListItem
                        key={motion.id}
                        motion={motion} />
            ) }
        </Stack>
        </>
    );
}
