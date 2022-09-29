import React, {useEffect, useState} from 'react';
import {Alert, Typography} from "@mui/material";
import SetupSection from "./SetupSection";
import Button from "@mui/material/Button";
import CategoryTitle from "../layout/CategoryTitle";
import UploadCSV, {INITIAL_UPLOADSTATE, StringTable, UploadState} from "./UploadCSV";

export type SetupParticipantsProps = {}

export default function SetupParticipants({}: SetupParticipantsProps) {

    const [ uploadState, setUploadState ] = useState<UploadState>(INITIAL_UPLOADSTATE);

    useEffect(() => {
        if (uploadState.isSuccess && uploadState.data) {
            // Mail ausloesen
            alert("Mail auslösen an: " + JSON.stringify(uploadState.data))
        }
    }, [uploadState]);

    return (
        <SetupSection>
            <CategoryTitle>Teilnehmer per Mail einladen</CategoryTitle>
            <UploadCSV variant="contained" uploadState={uploadState} setUploadState={setUploadState}>
                CSV-Datei hochladen
            </UploadCSV>
            <Typography variant="body2">{JSON.stringify(uploadState.data)}</Typography>
            {
                uploadState.isError &&
                <Alert severity="error">Upload fehlgeschlagen: {uploadState.error}</Alert>
            }
        </SetupSection>

    );
}
