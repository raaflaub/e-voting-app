import React, {useState} from 'react';
import {Box, Container, Tab, Tabs} from "@mui/material";
import VokkoHeader from "../header/VokkoHeader";
import {useParams} from "react-router-dom";
import useAxios from "axios-hooks";
import {Event} from "../api/model/event";

export type OrganizerEventLayoutProps = {}

export default function OrganizerEventLayout({}: OrganizerEventLayoutProps) {

    const params = useParams();
    const [{ data} ] = useAxios< { data: Event } >(`events/${params.eventId!}`);
    const event = data?.data;

    const [ tabIndex, setTabIndex] = useState(1);

    return (
        <>
            <VokkoHeader title={event?.title} backButton={true} userProfile={true} />
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs centered value={tabIndex} onChange={(e, newTabIndex) => setTabIndex(newTabIndex)}>
                    <Tab label="Setup"/>
                    <Tab label="Präsentation" />
                    <Tab label="Resultate" />
                </Tabs>
            </Box>
            <Container maxWidth="xs">
            </Container>
        </>
    );
}

