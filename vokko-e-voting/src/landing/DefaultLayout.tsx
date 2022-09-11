import React from 'react';
import {AppBar, Container, IconButton, Toolbar, Typography} from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import {Outlet, useNavigate} from "react-router-dom";
import VokkoHeader from "../header/VokkoHeader";

export type RegistrationLayoutProps = {}

export default function DefaultLayout({}: RegistrationLayoutProps) {
    const navigate = useNavigate();
    return (
        <>
        <VokkoHeader title="Default Layout" backButton={true} userProfile={true} />
        <Container maxWidth="xs">
            <Outlet />
        </Container>
        </>
    );
}
