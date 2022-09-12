import React from 'react';
import {Stack} from "@mui/material";
import {Motion} from '../model/vokkoEvents';
import MotionListItem, {MotionListItemProps} from "./MotionListItem";

export type MotionListProps = {
    motions: Motion[]
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
