import React, {useState} from 'react';
import {InputLabel, OutlinedInput, Paper, Stack, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import UploadCSV, {INITIAL_UPLOADSTATE, UploadState} from "../setup/UploadCSV";
import CategoryTitle from "../layout/CategoryTitle";
import {LocalizationProvider, DatePicker, TimePicker} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import localeDe from "date-fns/locale/de";

export type NewEventFormProps = {
    onClose: () => void;
}

export default function NewEventForm({ onClose }: NewEventFormProps) {

    const [ uploadedMotions, setUploadedMotions ] = useState<UploadState>(INITIAL_UPLOADSTATE);
    const [ eventDateTime, setEventDateTime ] = useState<Date | null>(null);
    const [ eventTitle, setEventTitle ] = useState<string>('Neues Event');

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={localeDe}>
        <Card sx={{backgroundColor: "#f5f5f5"}} raised>
            <CardContent component="form"
                         noValidate
                         autoComplete="off">
                <Stack direction="column" spacing={2} sx={{ my: 1, p:1 }} alignItems="center" justifyContent="center">
                    <Stack direction="row" spacing={2} alignItems="baseline" justifyContent="center">
                        <DatePicker
                            label="Datum"
                            value={eventDateTime}
                            onChange={(newValue) => setEventDateTime(newValue)}
                            renderInput={(params) => <TextField {...params} sx={{ bgcolor:"#ffffff", width:400}} />}
                        />
                        <TimePicker
                            label="Uhrzeit"
                            value={eventDateTime}
                            onChange={(newValue) => setEventDateTime(newValue)}
                            renderInput={(params) => <TextField {...params} sx={{ bgcolor:"#ffffff", width:400}} />}
                        />
                    </Stack>
                    <FormControl sx={{ m: 1, width:820, height:100 }}>
                        <InputLabel htmlFor="event-title">Titel</InputLabel>
                        <OutlinedInput
                            id="event-title"
                            label="Titel"
                            value={eventTitle}
                            onChange={(e) => setEventTitle(e.target.value)}
                            sx={{ bgcolor:"#ffffff"}}/>
                    </FormControl>
                    <Paper variant="outlined"
                        sx={{
                            pt:1, pb:4, px:2, mx:1,
                            backgroundColor: '#fff',
                            textAlign: 'center',
                            width: 820
                        }}>
                        <CategoryTitle>Vorlagen</CategoryTitle>
                        <UploadCSV variant="contained" uploadState={uploadedMotions} setUploadState={setUploadedMotions} disabled={false}>
                            CSV-Datei hochladen
                        </UploadCSV>
                    </Paper>
                    <Stack direction="row" spacing={2} alignItems="baseline" justifyContent="flex-end" sx={{ width: 820 }}>
                        <Button variant="text" onClick={onClose}>Abbrechen</Button>
                        <Button variant="contained" onClick={onClose} disabled>Speichern</Button>
                    </Stack>
                </Stack>

            </CardContent>
        </Card>
        </LocalizationProvider>
    );
}
