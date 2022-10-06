import React, {useCallback, useContext, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {Button, ButtonGroup, Container, Typography} from "@mui/material";
import VokkoHeader from "../header/VokkoHeader";
import {UserContext} from "../provider/UserContextProvider";
import {HubContext} from "../provider/HubContextProvider";
import CategoryTitle from "../layout/CategoryTitle";
import {IUser} from "../api/model/iuser";
import {buildRelativeInvitationLink} from "../user/userRegistration";
import {useTranslation} from "react-i18next";


export default function Landing() {

    const isDevEnvironment = (process.env.NODE_ENV === 'development');
    const isMobileEnvironment = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    const hub = useContext(HubContext);
    const user = useContext(UserContext);
    const navigate = useNavigate();

    // Sobald Hub-Verbindung steht und falls der User korrekt registriert ist:
    // Weiterleiten zur Voter-Event-Uebersicht.

    const defaultAction = useCallback(() => {
        if (hub && user.value?.user?.userId) {
            if (user.value.user.email === "organizer@vokko.cloud") {
                navigate('/organizer');
            } else {
                navigate('/voter');
            }
        }
    }, [hub, user, navigate]);

    const {t} = useTranslation();
    useEffect(() => {
        if (process.env.NODE_ENV !== 'development') {
            defaultAction();
        }
    }, [hub, user, defaultAction]);

    return (
        <>
            <VokkoHeader title=" " backButton={false} userProfile={false} />
            <Container maxWidth="sm">


                <CategoryTitle>
                    {t("welcome")}
                </CategoryTitle>

                <Typography variant="h5" color="text.secondary" sx={{ mt: 6, mb: 1}} >Falls du eine Event-Einladung erhalten hast</Typography>
                <Typography variant="subtitle1" >Bitte klicke auf den Link «TEILNEHMEN» im Einladungs-Mail.</Typography>

                <Typography variant="h5" color="text.secondary" sx={{ mt: 6, mb: 1}} >Falls du einen Event organisieren möchtest</Typography>
                {
                    isMobileEnvironment &&
                    <Typography variant="subtitle1"  sx={{ mb: 2}} >Bitte öffne «https://vokko.cloud» im Browser auf dem Desktop. {isMobileEnvironment}</Typography>
                }
                {
                    !isMobileEnvironment &&
                    <>
                        <Typography variant="subtitle1"  sx={{ mb: 2}} >Bitte registriere dich:</Typography>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                const user: IUser = { lastName: "Organizer", firstName: "The", email: "organizer@vokko.cloud"};
                                navigate(buildRelativeInvitationLink( "default", user, "organizer"));
                            }}>
                            Als Organisator registrieren
                        </Button>
                    </>

                }

                {isDevEnvironment && <Container sx={{ mx:0, my:8 }}>
                    <CategoryTitle>Dev section</CategoryTitle>
                    <ButtonGroup variant="outlined">
                        <Button onClick={defaultAction}>Default action</Button>
                        <Button onClick={() => {
                            const randomId = Math.random().toString(36).substring(3,7);
                            const user: IUser = { lastName: randomId, firstName: "Voter", email: `voter.${randomId}@vokko.cloud`};
                            navigate(buildRelativeInvitationLink( "default", user));
                        }}>Register as voter</Button>
                        <Button onClick={() => navigate("voter")}>Voter View</Button>
                        <Button onClick={() => navigate("organizer")}>Organizer View</Button>
                    </ButtonGroup>

                </Container>

                }
            </Container>
        </>
    );
}
