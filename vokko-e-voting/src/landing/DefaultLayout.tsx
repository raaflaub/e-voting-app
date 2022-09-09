import React from 'react';
import {AppBar, Container, IconButton, Toolbar, Typography} from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import {Outlet} from "react-router-dom";

export type RegistrationLayoutProps = {}

export default function DefaultLayout({}: RegistrationLayoutProps) {
    return (
        <Container maxWidth="xs">
            <AppBar>
                <Toolbar>
                    <IconButton href="/">
                        <ArrowLeftIcon />
                    </IconButton>
                    <Typography variant="h6">
                        Registration Layout
                    </Typography>
                </Toolbar>
            </AppBar>
            <Outlet />
        </Container>
    );
}
