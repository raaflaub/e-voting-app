import React, {useCallback, useContext, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {Button, ButtonGroup, Container, Typography} from "@mui/material";
import VokkoHeader from "../header/VokkoHeader";
import {UserContext} from "../provider/UserContextProvider";
import {HubContext} from "../provider/HubContextProvider";
import CategoryTitle from "../layout/CategoryTitle";
import VoteOptionsControl from "../vote/VoteOptionsControl";
import VoteResultsPieChart from "../vote/VoteResultsPieChart";
import {IUser} from "../api/model/iuser";
import {buildRelativeInvitationLink} from "../user/userRegistration";
import {ResultBar} from "../results/ResultBar";

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
            navigate('/voter');
        }
    }, [hub, user, navigate]);

    useEffect(() => {
        if (process.env.NODE_ENV !== 'development') {
            defaultAction();
        }
    }, [hub, user, defaultAction]);

    const user1: IUser = { lastName: "Organizer", firstName: "The", email: "organizer@vokko.cloud"};
    console.log('invitation link 1', buildRelativeInvitationLink("default", user1, "organizer"));

    const randomId = Math.random().toString(36).substring(3,7);
    const user2: IUser = { lastName: randomId, firstName: "Voter", email: `voter.${randomId}@vokko.cloud`};
    console.log('invitation link 2', buildRelativeInvitationLink("default", user2 ));

    return (
        <>
            <VokkoHeader title=" " backButton={false} userProfile={false} />
            <Container maxWidth="sm">

                <CategoryTitle>
                    Willkommen
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
                        <Button onClick={() => navigate("organizer")}>Organizer View</Button>
                    </ButtonGroup>
                    {/*<VoteProgress endDate={new Date(Date.now() + 120000)} />*/}


                    <ResultBar  options={

                        [
                            {votingOptionId: "dsadasdadss-dasdsadsadassdas-dsasdasdsa", title: "Yes",voteCount: 10},
                            {votingOptionId: "dsadasddsadas-dasdsadsadassdas-dsasdasdsa", title: "No", voteCount: 5},
                            {votingOptionId: "dsadasddsa-dasdsadsadassdas-dsasdasdsa", title: "Abstain", voteCount: 2}
                        ]

                    }  />

                    {/*<VoteOptionsControl  options={*/}

                    {/*    [*/}
                    {/*        {votingOptionId: "dsadasdadss-dasdsadsadassdas-dsasdasdsa", title: "Yes"},*/}
                    {/*        {votingOptionId: "dsadasddsadas-dasdsadsadassdas-dsasdasdsa", title: "No"},*/}
                    {/*        {votingOptionId: "dsadasddsa-dasdsadsadassdas-dsasdasdsa", title: "Abstain"}*/}
                    {/*    ]*/}

                    {/*} voteOptionCount={1} onSelectionChanged={console.log}/>*/}
                    {/*<VoteOptionsControl options={*/}

                    {/*    [*/}
                    {/*        {votingOptionId: "dsadasdadss-dasdsadsadassdas-dsasdasdsa", title: "Walter"},*/}
                    {/*        {votingOptionId: "dsadasddsadas-dasdsadsadassdas-dsasdasdsa", title: "Remo"},*/}
                    {/*        {votingOptionId: "dsadasddsa-dasdsadsadassdas-dsasdasdsa", title: "Jonas"}*/}
                    {/*    ]*/}

                    {/*} voteOptionCount={2} onSelectionChanged={console.log} disabled={true}/>*/}
                </Container>

                }
            </Container>
        </>
    );
}
