import React, {useState} from 'react';
import SetupSection from "./SetupSection";
import {Stack} from "@mui/material";
import {Event} from "../api/model/event";
import CategoryTitle from "../layout/CategoryTitle";
import OrganizerMotionList from "../organizer/OrganizerMotionList";
import {getMotionById} from "../event/eventUtils";
import {IVoting} from "../api/model/ivoting";
import VotePreviewDialog from "../vote/VotePreviewDialog";
import {useTranslation} from "react-i18next";

export type SetupMotionsProps = { event: Event }

export default function SetupMotions({ event }: SetupMotionsProps) {

    const [ showPreviewOfMotion, setShowPreviewOfMotion ] = useState<string|null>(null);
    const {t} = useTranslation();
    const openPreviewDialog = (motion: IVoting) => {
        if (motion.id) {
            setShowPreviewOfMotion(motion.id);
        }
    }

    return (
        <>
            <SetupSection>
                <CategoryTitle>{t("motions")}</CategoryTitle>
                {
                    event.motions &&
                    <Stack maxWidth="sm" ml="auto" mr="auto">
                        <OrganizerMotionList
                            motions={event.motions}
                            actionTitle={t("preview")}
                            onAction={openPreviewDialog}
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
