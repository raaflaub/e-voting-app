import React from 'react';
import {AppBar, Container, IconButton, Toolbar, Typography} from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import {Outlet, useNavigate} from "react-router-dom";

export type RegistrationLayoutProps = {}

export default function DefaultLayout({}: RegistrationLayoutProps) {
    const navigate = useNavigate();
    return (
        <>
        <AppBar position="sticky">
            <Toolbar>
                <IconButton color="inherit" onClick={() => navigate(-1)}>
                    <ArrowLeftIcon />
                </IconButton>
                <Typography variant="h6" align="center" flexGrow={1}>
                    Default Layout
                </Typography>
            </Toolbar>
        </AppBar>
        <Container maxWidth="xs">
            <Outlet />
        </Container>
        </>
    );
}
