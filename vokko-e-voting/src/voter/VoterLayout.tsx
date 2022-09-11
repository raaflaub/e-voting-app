import React from 'react';
import {Container} from "@mui/material";
import {Outlet, useNavigate} from "react-router-dom";
import VokkoHeader from "../header/VokkoHeader";

export type VoterLayoutProps = {}

export default function VoterLayout({}: VoterLayoutProps) {
    const navigate = useNavigate();
    return (
        <>
        <VokkoHeader title="HEC Alumni GM 2022" backButton={false} userProfile={true} />
        <Container maxWidth="xs">
            <Outlet />
        </Container>
      </>
    );
}
