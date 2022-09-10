import React from 'react';
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import {useNavigate} from "react-router-dom";

export type UserRegistrationProps = {}

export default function UserRegistration({}: UserRegistrationProps) {
    const navigate = useNavigate();
    return (
        <Container maxWidth="xs">
            <AppBar>
                <Toolbar>
                    <IconButton onClick={() => navigate(-1)}>
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
