import React, {useContext, useEffect} from 'react';
import {CircularProgress, Container, Stack} from "@mui/material";
import {useNavigate, useSearchParams} from "react-router-dom";
import VokkoHeader from "../header/VokkoHeader";
import {useRegistrationByInvitationLink} from "./userRegistration";
import CategoryTitle from "../layout/CategoryTitle";
import {UserContext} from "../provider/UserContextProvider";
import {HubContext} from "../provider/HubContextProvider";

export default function UserRegistrationProgress() {

    const registeredUser = useContext(UserContext);
    const hub = useContext(HubContext);

    const { invitationLinkUser, registrationInProgess, error } = useRegistrationByInvitationLink();

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Bei Fehler zurueck zur Landing Page
    // Bei Erfolg weiter zum Event, sobald der Hub connected ist
    useEffect(() => {
        if (error) {
            navigate('/');
        } else if (hub && !registrationInProgess) {
            navigate(searchParams.get("view") === 'organizer' ? '/organizer' : '/voter');
        }
    }, [error, registrationInProgess, hub]);

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
