import React from 'react';
import {Container} from "@mui/material";
import {Outlet} from "react-router-dom";
import VokkoHeader from "../header/VokkoHeader";
import {currentEventTitle} from "../model/vokkoEvents";

export type VoterLayoutProps = {}

export default function VoterLayout({}: VoterLayoutProps) {
    return (
        <>
            <VokkoHeader title={currentEventTitle} backButton={false} userProfile={true} />
            <Container maxWidth="xs">
                <Outlet />
            </Container>
        </>
    );
}
