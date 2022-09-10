import React from 'react';
import {AppBar, Container, IconButton, Toolbar, Typography} from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import {useNavigate} from "react-router-dom";

export type OrganizerLayoutProps = {}

export default function OrganizerLayout({}: OrganizerLayoutProps) {
    const navigate = useNavigate();
    return (
        <>
        <AppBar position="sticky">
            <Toolbar>
                <IconButton color="inherit" onClick={() => navigate(-1)}>
                    <ArrowLeftIcon />
                </IconButton>
                <Typography variant="h6" align="center" flexGrow={1}>
                    Organizer Layout
                </Typography>
            </Toolbar>
        </AppBar>
        <Container maxWidth="xs">
        </Container>
        </>
    );
}

