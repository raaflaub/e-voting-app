import React, {useEffect} from 'react';
import {CircularProgress, Container, Stack} from "@mui/material";
import {useNavigate, useSearchParams} from "react-router-dom";
import VokkoHeader from "../header/VokkoHeader";
import {useRegistrationByInvitationLink} from "./userRegistration";
import CategoryTitle from "../layout/CategoryTitle";

export default function UserRegistrationProgress() {

    const { invitationLinkUser, registrationInProgess, error } = useRegistrationByInvitationLink();

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Bei Fehler zurueck zur Landing Page, bei Erfolg weiter zum Event
    useEffect(() => {
        if (error) {
            navigate('/');
        } else if (!registrationInProgess) {
            navigate(searchParams.get("view") === 'organizer' ? '/organizer' : '/voter');
        }
    }, [error, registrationInProgess]);

    return (
        <>
            <VokkoHeader title=" " backButton={false} userProfile={true} />
            <Container maxWidth="xs">
                <Stack display="flex"
                       height="100vh"
                       flexDirection="column"
                       justifyContent="center"
                       alignItems="center"
                       spacing={4}
                >
                    <CircularProgress color="inherit"/>
                    {
                        invitationLinkUser &&
                        <CategoryTitle>Willkommen</CategoryTitle>
                    }
                </Stack>

            </Container>
        </>
    );
}
