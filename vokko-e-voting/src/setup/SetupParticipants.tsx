import React, {useEffect, useState} from 'react';
import {
    Alert, CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
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
        }
    }, [uploadState]);

    return (
        <SetupSection>
            <CategoryTitle>Teilnehmer per Mail einladen</CategoryTitle>
            <UploadCSV variant="contained" uploadState={uploadState} setUploadState={setUploadState}>
                CSV-Datei hochladen
            </UploadCSV>
            {
                uploadState.data &&
                <TableContainer sx={{ mt:4, mb:2, mx:2 }}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Vorname</TableCell>
                                <TableCell>Nachname</TableCell>
                                <TableCell>E-Mail</TableCell>
                                <TableCell>gesendet</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {uploadState.data.map((row, rowIndex) => (
                                <TableRow
                                    key={rowIndex}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    {row.map((value, colIndex) => (
                                        <TableCell key={colIndex}>
                                            {value}
                                        </TableCell>
                                    ))}
                                    <TableCell>
                                        <CircularProgress size="1rem" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
            {
                uploadState.isError &&
                <Alert severity="error">Upload fehlgeschlagen: {uploadState.error}</Alert>
            }
        </SetupSection>

    );
}
