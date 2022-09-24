import React from 'react';
import {Stack} from "@mui/material";
import OrganizerMotionListItem, {OrganizerMotionListItemProps} from "./OrganizerMotionListItem";
import {IVoting} from "../api/model/ivoting";

export type OrganizerMotionListProps = {
    motions: IVoting[];
    actionTitle?: string | null;
    onAction?: (motion: IVoting) => void;
}

export default function OrganizerMotionList({ motions, actionTitle, onAction }: OrganizerMotionListProps) {
    return (
        <>
            <Stack spacing={2} mb={5}>
                { motions.map(
                    motion =>
                        <OrganizerMotionListItem
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
