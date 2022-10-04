import React, {useContext, useEffect} from 'react';
import {Container, Stack, Typography} from "@mui/material";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import VokkoHeader from "../header/VokkoHeader";
import {useRegistrationByInvitationLink} from "./userRegistration";
import CategoryTitle from "../layout/CategoryTitle";
import {HubContext} from "../provider/HubContextProvider";
import ProgressWithSuccess from "./ProgressWithSuccess";
import {useTranslation} from "react-i18next";

export default function UserRegistrationProgress() {

    const {t} = useTranslation();

    const hub = useContext(HubContext);

    const { registrationInProgess, keypairCreated, error } = useRegistrationByInvitationLink();

    const params = useParams();
    const eventId = params.eventId!;

    const [searchParams] = useSearchParams();
    const targetView =
        searchParams.get("view") === 'organizer' ? '/organizer'
      : eventId === 'default'                    ? '/voter'
      :                                            `/voter/event-session/${eventId}`;

    const navigate = useNavigate();

    // Bei Fehler zurueck zur Landing Page
    // Bei Erfolg weiter zum Event, sobald der Hub connected ist
    useEffect(() => {
        if (error) {
            navigate('/');
        } else if (hub && !registrationInProgess) {
            setTimeout(() => navigate(targetView), 500);
        }
    }, [error, registrationInProgess, targetView, hub, navigate]);

    return (
        <>
            <VokkoHeader title=" " backButton={false} userProfile={true} />
            <Container maxWidth="xs">
                <CategoryTitle>{t("welcome")}</CategoryTitle>
                <Stack direction="column" spacing={2} sx={{ mt: 6, mb: 1}}>
                    <Stack direction="row" spacing={4} alignItems="center">
                        <ProgressWithSuccess loading={registrationInProgess && !keypairCreated} success={keypairCreated}/>
                        <Typography variant="subtitle1" color="text.secondary">{t("generating_keypair")}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={4} alignItems="center">
                        <ProgressWithSuccess loading={registrationInProgess && keypairCreated} success={!registrationInProgess}/>
                        <Typography variant="subtitle1" color="text.secondary">{t("setting_up_ballot_box")}</Typography>
                    </Stack>
                </Stack>
            </Container>
        </>
    );
}
