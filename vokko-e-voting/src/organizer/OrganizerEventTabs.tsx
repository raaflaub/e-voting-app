import React from 'react';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {Box} from "@mui/material";
import {Build, PlayArrow, BarChart} from "@mui/icons-material";
import {useTranslation} from "react-i18next";

export type OrganizerTab = 'setup'|'live'|'results';

export type OrganizerEventTabsProps = {
    activeTab: OrganizerTab,
    onActiveTabChange: (activeTab: OrganizerTab) => void,
    setupEnabled: boolean,
    liveEnabled: boolean,
    resultsEnabled: boolean
}

export default function OrganizerEventTabs({ activeTab, onActiveTabChange, setupEnabled, liveEnabled, resultsEnabled }: OrganizerEventTabsProps) {

    const {t} = useTranslation();
    return (
        <Box sx={{ marginTop: 3, borderBottom: 1, borderColor: 'divider' }}>
            <Tabs centered value={activeTab} onChange={(e, newActiveTab) => onActiveTabChange(newActiveTab)}>
                <Tab icon={<Build />}     label={t("setup")} value="setup"   disabled={!setupEnabled}  />
                <Tab icon={<PlayArrow />} label={t("live")} value="live"    disabled={!liveEnabled}   />
                <Tab icon={<BarChart />}  label={t("results")} value="results" disabled={!resultsEnabled}/>
            </Tabs>
        </Box>
    );
}
