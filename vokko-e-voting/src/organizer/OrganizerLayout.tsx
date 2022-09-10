import React from 'react';
import {AppBar, Container, IconButton, Toolbar, Typography} from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import {useNavigate} from "react-router-dom";

export type OrganizerLayoutProps = {}

export default function OrganizerLayout({}: OrganizerLayoutProps) {
    const navigate = useNavigate();
    return (
        <Container maxWidth="xs">
            <AppBar>
                <Toolbar>
                    <IconButton onClick={() => navigate(-1)}>
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

