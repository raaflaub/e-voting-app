import React from 'react';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {Link, matchPath, useLocation} from "react-router-dom";
import {Box} from "@mui/material";
import {Build, PlayArrow, BarChart} from "@mui/icons-material";

export type OrganizerEventTabsProps = {
    basePath: string,
    setupEnabled: boolean,
    liveEnabled: boolean,
    resultsEnabled: boolean
}

function useRouteMatch(basePath: string, patterns: readonly string[]) {
    const { pathname } = useLocation();

    console.log('patterns=', patterns);
    console.log('pathname=', pathname);

    for (let i = 0; i < patterns.length; i += 1) {
        const pattern = patterns[i];
        const possibleMatch = matchPath(basePath + pattern, pathname);
        console.log('tryMatch', pattern, pathname);
        if (possibleMatch !== null) {
            console.log('match=', possibleMatch);
            return possibleMatch;
        }
    }

    return null;
}

export default function OrganizerEventTabs({ basePath, setupEnabled, liveEnabled, resultsEnabled }: OrganizerEventTabsProps) {
    const routeMatch = useRouteMatch(basePath, ['/setup', '/live', '/results']);
    const currentTab = routeMatch?.pattern?.path;
    console.log('currentTab', JSON.stringify(currentTab));
    return (
        <Box sx={{ marginTop: 3, borderBottom: 1, borderColor: 'divider' }}>
            <Tabs centered value={currentTab}>
                <Tab icon={<Build />} label="Setup" value={basePath + "/setup"} to="./setup" disabled={!setupEnabled} component={Link} />
                <Tab icon={<PlayArrow />} label="Präsentation" value={basePath + "/live"} to="./live" disabled={!liveEnabled} component={Link} />
                <Tab icon={<BarChart />} label="Resultate" value={basePath + "/results"} to="./results" disabled={!resultsEnabled} component={Link} />
            </Tabs>
        </Box>
    );
}
