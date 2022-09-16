import React, {useEffect, useState} from 'react';
import {CircularProgress, Container, Stack} from "@mui/material";
import {useSearchParams} from "react-router-dom";
import VokkoHeader from "../header/VokkoHeader";
import {IUser} from "../api/model/iuser";
import {checkUserRegistration} from "./userRegistration";

export type UserRegistrationProps = {}

export interface VokkoKeyPair {
    privateKey: string;
    publicKey: string;
}

export default function UserRegistrationProgress({}: UserRegistrationProps) {

    const [ keyPair, setKeyPair ] = useState<VokkoKeyPair|null>( null );

    useEffect(() => {
        const storedKeypairData = window.localStorage.getItem('VOKKO_KEYPAIR');
        console.log(`reading ${storedKeypairData}`);
        if (storedKeypairData) {
            setKeyPair(JSON.parse(storedKeypairData));
        }
    }, []);

    useEffect(() => {
        const storedKeypairData = window.localStorage.getItem('VOKKO_KEYPAIR');
        if (keyPair) {
            const newKeypairData = JSON.stringify(keyPair);
            if (newKeypairData !== storedKeypairData) {
                console.log(`replacing ${storedKeypairData} by ${newKeypairData}`);
                window.localStorage.setItem('VOKKO_KEYPAIR', newKeypairData);
            }
        } else if (storedKeypairData) {
            console.log(`removing ${storedKeypairData}`);
            window.localStorage.removeItem('VOKKO_KEYPAIR');
        }
    }, [keyPair]);

    const [searchParams] = useSearchParams();

    const user: IUser = {
        firstName: searchParams.get("firstname"),
        lastName: searchParams.get("lastname"),
        email: searchParams.get("email")
    };

    useEffect(() => {
        const userRegistration = checkUserRegistration(user);
        console.log('checkedUserRegistration', JSON.stringify(userRegistration));
    });

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
                </Stack>

            </Container>
        </>
    );
}
