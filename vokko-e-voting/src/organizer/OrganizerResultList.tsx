import React, {ReactNode} from 'react';
import {Stack} from "@mui/material";
import {IVoting} from "../api/model/ivoting";
import OrganizerResultListItem from "./OrganizerResultListItem";

export type OrganizerResultListProps = {
    motions: IVoting[];
    header?: ReactNode;
    footer?: ReactNode;
}

export default function OrganizerResultList({ motions, header, footer }: OrganizerResultListProps) {
    return (
        <>
            <Stack spacing={2} mb={5}>
                {
                    header
                }
                {
                    motions.map(
                        motion =>
                            <OrganizerResultListItem
                                key={motion.id}
                                motion={motion}

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
