import React from 'react';
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

export type UserRegistrationProps = {}

export default function UserRegistration({}: UserRegistrationProps) {
    return (
        <Container maxWidth="xs">
            <AppBar>
                <Toolbar>
                    <IconButton href="/">
                        <ArrowLeftIcon />
                    </IconButton>
                    <Typography variant="h6">
                        User Registration
                    </Typography>
                </Toolbar>
            </AppBar>
        </Container>
    );
}
