import React from 'react';
import {CircularProgress, Container, Stack} from "@mui/material";
import CategoryTitle from "../layout/CategoryTitle";

export type LoadingProps = { text: string };

export default function Loading({ text }: LoadingProps) {
    return (
            <>
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
                            text &&
                            <CategoryTitle>{text}</CategoryTitle>
                        }
                    </Stack>

                </Container>
            </>
        );
}
