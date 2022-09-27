import React, {ReactNode} from 'react';
import {Stack} from "@mui/material";
import OrganizerMotionListItem from "./OrganizerMotionListItem";
import {IVoting} from "../api/model/ivoting";

export type OrganizerMotionListProps = {
    motions: IVoting[];
    actionTitle?: string | null;
    onAction?: (motion: IVoting) => void;
    header?: ReactNode;
    footer?: ReactNode;
}

export default function OrganizerMotionList({ motions, actionTitle, onAction, header, footer }: OrganizerMotionListProps) {
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
