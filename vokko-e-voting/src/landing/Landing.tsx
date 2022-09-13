import React from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import {Button, Container, Grid} from "@mui/material";

export default function Landing() {
    const navigate = useNavigate();
    return (
        <Container maxWidth="sm">

            <p><em>(Hier aufgrund Benutzertyp automatisch verzweigen zu Registrierung / weiter als Wähler / weiter als Organisator)</em></p>

            <Grid container spacing={2} justifyContent="center">
                <Grid item>
                    <Button variant="contained" onClick={() => navigate("register")}>Registrieren</Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={() => navigate("organizer")}>Ein Meeting organisieren</Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={() => navigate("voter")}>An einem Meeting teilnehmen</Button>
                </Grid>
                {/*    <Grid item>
                    <Button variant="contained" onClick={() => navigate("test")}>Test-Area</Button>
                </Grid>  */}
            </Grid>

            <Outlet />
        </Container>
    );
}
