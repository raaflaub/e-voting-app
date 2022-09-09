import React from 'react';
import {AppBar, Container, IconButton, Toolbar, Typography} from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import {Navigate, Outlet} from "react-router-dom";
import VoterMeetingOverview from "./VoterMeetingOverview";
import VoterMeetingRoutes from "./VoterMeetingRoutes";

export type VoterLayoutProps = {}

export default function VoterLayout({}: VoterLayoutProps) {
    return (
        <Container maxWidth="xs">
            <AppBar>
                <Toolbar>
                    <IconButton href="/">
                        <ArrowLeftIcon />
                    </IconButton>
                    <Typography variant="h6">
                        Voter Layout
                    </Typography>
                </Toolbar>
            </AppBar>
            <Outlet />
        </Container>
    );
}
