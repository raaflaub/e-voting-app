import React from 'react';
import {CircularProgress, Container, Stack} from "@mui/material";
import vokkoLogoSmall from "../header/vokkoLogoSmall.png";
import VokkoHeader from "../header/VokkoHeader";
import CategoryTitle from "../layout/CategoryTitle";

export default function Loading() {
    return (
            <>
                <VokkoHeader title=" " backButton={false} userProfile={false} />
                <Container maxWidth="xs">
                    <Stack display="flex"
                           height="100vh"
                           flexDirection="column"
                           justifyContent="center"
                           alignItems="center"
                           spacing={4}
                    >
                        <CircularProgress color="inherit"/>
                        <CategoryTitle>Willkommen</CategoryTitle>
                    </Stack>

                </Container>
            </>
        );
}
