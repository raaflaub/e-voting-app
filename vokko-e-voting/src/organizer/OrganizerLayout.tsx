import React from 'react';
import {AppBar, Container, IconButton, Toolbar, Typography} from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import MeetingRoutes from "./OrganizerMeetingRoutes";
import MeetingOverview from "./OrganizerMeetingOverview";
import {Navigate} from "react-router-dom";

export type OrganizerLayoutProps = {}

export default function OrganizerLayout({}: OrganizerLayoutProps) {
    return (
        <Container maxWidth="xs">
            <AppBar>
                <Toolbar>
                    <IconButton href="/">
                        <ArrowLeftIcon />
                    </IconButton>
                    <Typography variant="h6">
                        Organizer Layout
                    </Typography>
                </Toolbar>
            </AppBar>
        </Container>
    );
}

