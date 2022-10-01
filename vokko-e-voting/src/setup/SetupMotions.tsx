import React, {useEffect, useState} from 'react';
import SetupSection from "./SetupSection";
import {Button, Stack, Typography} from "@mui/material";
import {Event} from "../api/model/event";
import {useResetEventsMutation} from "../api/persistence";
import CategoryTitle from "../layout/CategoryTitle";
import OrganizerMotionList from "../organizer/OrganizerMotionList";
import {getMotionById} from "../event/eventUtils";
import TimeLineButton from "../layout/TimeLineButton";
import {IVoting} from "../api/model/ivoting";
import VotePreviewDialog from "../vote/VotePreviewDialog";

export type SetupMotionsProps = { event: Event }

export default function SetupMotions({ event }: SetupMotionsProps) {

    const [ showPreviewOfMotion, setShowPreviewOfMotion ] = useState<string|null>(null);

    const resetEventsMutation = useResetEventsMutation();

    const openPreviewDialog = (motion: IVoting) => {
        if (motion.id) {
            setShowPreviewOfMotion(motion.id);
        }
    }

    return (
        <>
            <SetupSection>
                <CategoryTitle>Vorlagen</CategoryTitle>
                {
                    event.motions &&
                    <Stack maxWidth="sm" ml="auto" mr="auto">
                        <OrganizerMotionList
                            motions={event.motions}
                            actionTitle="Vorschau"
                            onAction={openPreviewDialog}
                            footer={
                                <TimeLineButton
                                    variant="contained"
                                    disabled={ resetEventsMutation.isLoading || resetEventsMutation.isError}
                                    onClick={() => resetEventsMutation.mutate([]) }
                                >
                                    Reset
                                </TimeLineButton>
                            }
                        />
                    </Stack>
                }
            </SetupSection>
            <VotePreviewDialog
                open={showPreviewOfMotion !== null}
                onClose={() => setShowPreviewOfMotion(null)}
                motion={showPreviewOfMotion ? getMotionById(event, showPreviewOfMotion) : null}
            />
        </>
    );
}
