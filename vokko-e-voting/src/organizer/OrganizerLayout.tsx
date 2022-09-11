import React from 'react';
import {Container} from "@mui/material";
import VokkoHeader from "../header/VokkoHeader";

export type OrganizerLayoutProps = {}

export default function OrganizerLayout({}: OrganizerLayoutProps) {
    return (
        <>
            <VokkoHeader title="Organizer Layout" backButton={true} userProfile={true} />
            <Container maxWidth="xs">
            </Container>
        </>
    );
}

