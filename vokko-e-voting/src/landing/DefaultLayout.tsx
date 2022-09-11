import React from 'react';
import {Container} from "@mui/material";
import {Outlet} from "react-router-dom";
import VokkoHeader from "../header/VokkoHeader";

export type RegistrationLayoutProps = {}

export default function DefaultLayout({}: RegistrationLayoutProps) {
    return (
        <>
            <VokkoHeader title="Default Layout" backButton={false} userProfile={false} />
            <Container maxWidth="xs">
                <Outlet />
            </Container>
        </>
    );
}
