import React from 'react';
import {CircularProgress, Container, Stack} from "@mui/material";
import {useNavigate} from "react-router-dom";
import VokkoHeader from "../header/VokkoHeader";
import {useRegistrationByInvitationLink} from "./userRegistration";
import CategoryTitle from "../layout/CategoryTitle";

export default function UserRegistrationProgress() {

    const { invitationLinkUser, registrationInProgess, error } = useRegistrationByInvitationLink();

    const navigate = useNavigate();

    // Bei Fehler zurueck zur Landing Page, bei Erfolg weiter zum Event
    if (error) {
        navigate('/');
    } else if (!registrationInProgess) {
        navigate('/voter');
    }

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
                        <CategoryTitle>Hallo {invitationLinkUser.firstName} {invitationLinkUser.lastName}</CategoryTitle>
                    }
                </Stack>

            </Container>
        </>
    );
}
