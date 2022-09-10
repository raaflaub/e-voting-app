import React from 'react';
import {AppBar, Container, IconButton, Toolbar, Typography} from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import {Outlet, useNavigate} from "react-router-dom";

export type VoterLayoutProps = {}

export default function VoterLayout({}: VoterLayoutProps) {
    const navigate = useNavigate();
    return (
        <>
        <AppBar position="sticky">
            <Toolbar>
                <IconButton color="inherit" onClick={() => navigate(-1)}>
                    <ArrowLeftIcon />
                </IconButton>
                <Typography variant="h6" flexGrow={1}>
                    Voter Layout
                </Typography>
            </Toolbar>
        </AppBar>
        <Container maxWidth="xs">
            <Outlet />
        </Container>
      </>
    );
}
