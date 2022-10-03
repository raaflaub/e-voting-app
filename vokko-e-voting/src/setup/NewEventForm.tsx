import React, {useEffect, useState} from 'react';
import {InputLabel, OutlinedInput, Paper, Stack, TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import UploadCSV, {INITIAL_UPLOADSTATE, UploadState} from "../setup/UploadCSV";
import CategoryTitle from "../layout/CategoryTitle";
import {LocalizationProvider, DatePicker, TimePicker} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import localeDe from "date-fns/locale/de";
import {Event} from "../api/model/event";

export type NewEventFormProps = {
    onClose: () => void;
}

export default function NewEventForm({ onClose }: NewEventFormProps) {

    const [ event, setEvent ] = useState<Event>({});

    const [ eventDate, setEventDate ] = useState<Date | null>(null);
    const [ eventStartTime, setEventStartTime ] = useState<Date | null>(null);
    const [ eventEndTime, setEventEndTime ] = useState<Date | null>(null);

    const [ uploadedMotions, setUploadedMotions ] = useState<UploadState>(INITIAL_UPLOADSTATE);

    // Werte aus drei Eingabefeldern in zwei DateTime-Werte mit gleichem Datumsteil hineinzwängen.

    useEffect(() => {
        if (eventDate && eventStartTime) {
            let newValue = eventDate;
            newValue.setHours(eventStartTime.getHours());
            newValue.setMinutes(eventStartTime.getMinutes());
            setEvent({...event, planedStartDate: newValue});
        }
    }, [eventDate, eventStartTime]);

    useEffect(() => {
        if (eventDate && eventEndTime) {
            let newValue = eventDate;
            newValue.setHours(eventEndTime.getHours());
            newValue.setMinutes(eventEndTime.getMinutes());
            setEvent({...event, planedEndDate: newValue});
        }
    }, [eventDate, eventEndTime]);

    // Hochgeladene Vorlagen übernehmen.

    useEffect(() => {
        if (uploadedMotions.isSuccess && uploadedMotions.data && !event.motions) {
            setEvent({
                ...event,
                motions: uploadedMotions.data.map(
                    (rowElements) => ({
                        ownerId: null,
                        votingTitle: rowElements[0],
                        question: rowElements[1],
                        description: rowElements[2],
                        options: rowElements.slice(3, rowElements.length-1).map(
                            (rowElement) => ({ title: rowElement })
                        )
                    })
                )
            })
        }
    }, [uploadedMotions, event]);

    const eventIsComplete = event.planedStartDate && event.planedEndDate && event.title && event.motions;

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
                            value={eventDate} onChange={setEventDate}
                            renderInput={(params) => <TextField {...params} sx={{ bgcolor:"#ffffff", width:350}} />}
                        />
                        <TimePicker
                            label="Von"
                            value={eventStartTime} onChange={setEventStartTime}
                            renderInput={(params) => <TextField {...params} sx={{ bgcolor:"#ffffff", width:220}} />}
                        />
                        <TimePicker
                            label="Bis"
                            value={eventEndTime} onChange={setEventEndTime}
                            renderInput={(params) => <TextField {...params} sx={{ bgcolor:"#ffffff", width:220}} />}
                        />
                    </Stack>
                    <Typography>{JSON.stringify(event)}</Typography>
                    <FormControl sx={{ m: 1, width:820, height:100 }}>
                        <InputLabel htmlFor="event-title">Titel</InputLabel>
                        <OutlinedInput
                            id="event-title"
                            label="Titel"
                            value={event.title} onChange={e => setEvent({...event, title: e.target.value})}
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
                        {
                            event?.motions &&
                            <Typography variant="body2" color="text.secondary" sx={{ my: 2, textAlign: "center"}} >
                                {event?.motions.length} Vorlage(n) importiert.
                            </Typography>
                        }
                    </Paper>
                    <Stack direction="row" spacing={2} alignItems="baseline" justifyContent="flex-end" sx={{ width: 820 }}>
                        <Button variant="text" onClick={onClose}>Abbrechen</Button>
                        <Button variant="contained" onClick={onClose} disabled={!eventIsComplete}>Speichern</Button>
                    </Stack>
                </Stack>

            </CardContent>
        </Card>
        </LocalizationProvider>
    );
}
