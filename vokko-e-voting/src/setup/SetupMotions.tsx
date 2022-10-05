import React from 'react';
import SetupSection from "./SetupSection";
import {Stack} from "@mui/material";
import {Event} from "../api/model/event";
import CategoryTitle from "../layout/CategoryTitle";
import OrganizerMotionList from "../organizer/OrganizerMotionList";
import {useTranslation} from "react-i18next";

export type SetupMotionsProps = { event: Event }

export default function SetupMotions({ event }: SetupMotionsProps) {

    const {t} = useTranslation();

    return (
        <>
            <SetupSection>
                <CategoryTitle>{t("motions")}</CategoryTitle>
                {
                    event.motions &&
                    <Stack maxWidth="sm" ml="auto" mr="auto">
                        <OrganizerMotionList
                            motions={event.motions}
                        />
                    </Stack>
                }
            </SetupSection>
        </>
    );
}
