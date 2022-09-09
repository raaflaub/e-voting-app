import React from 'react';
import {Outlet} from "react-router-dom";
import {AppBar, Button, Container, Grid, Toolbar, Typography} from "@mui/material";

export type DefaultLandingScreenProps = {}

export default function Landing({}: DefaultLandingScreenProps) {
    return (
        <Container maxWidth="sm">
            <AppBar>
                <Toolbar>
                    <Typography variant="h6">
                        Default Landing Page
                    </Typography>
                </Toolbar>
            </AppBar>
            <p>...</p>
            <p>...</p>
            <p><em>(Hier aufgrund Benutzertyp automatisch verzweigen zu Registrierung / weiter als Wähler / weiter als Organisator)</em></p>

            <Grid container spacing={2} justifyContent="center">
                <Grid item>
                    <Button variant="contained" href="register">Registrieren</Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" href="organizer">Ein Meeting organisieren</Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" href="voter">An einem Meeting teilnehmen</Button>
                </Grid>
                {/*    <Grid item>
                    <Button variant="contained" href="test">Test-Area</Button>
                </Grid>  */}
            </Grid>

            <Outlet />
        </Container>
    );
}
