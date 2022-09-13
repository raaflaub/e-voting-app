import React from 'react';
import {CircularProgress, Stack} from "@mui/material";
import vokkoLogoSmall from "../header/vokkoLogoSmall.png";

export default function Loading() {
    return (
        <Stack display="flex"
               height="100vh"
               flexDirection="column"
               justifyContent="center"
               alignItems="center"
               spacing={4}
               color="white"
               bgcolor="#2196f3"
        >
            <CircularProgress color="inherit"/>
            <img src={vokkoLogoSmall} alt="VOKKO Logo" style={{ width:80, height:16 }}/>
        </Stack>
    );
}
