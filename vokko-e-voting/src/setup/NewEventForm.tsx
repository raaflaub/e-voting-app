import React, {useEffect, useState} from 'react';
import {Alert, InputLabel, OutlinedInput, Paper, Stack, TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import UploadCSV, {INITIAL_UPLOADSTATE, UploadState} from "../setup/UploadCSV";
import CategoryTitle from "../layout/CategoryTitle";
import {LocalizationProvider, DatePicker, TimePicker} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import localeDe from "date-fns/locale/de";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import {useCreateEventMutation} from "../api/persistence";
import {PostEventRequestData} from "../api/model/post-event-request-data";
import {v4 as uuidv4} from 'uuid';

export type NewEventFormProps = {
    visible: boolean,
    setVisible: (visible: boolean) => void;
}

export default function NewEventForm({ visible, setVisible }: NewEventFormProps) {

    const createEventMutation = useCreateEventMutation();

    const [ eventRequestData, setEventRequestData ] = useState<PostEventRequestData>({});

    const [ eventDate, setEventDate ] = useState<Date | null>(null);
    const [ eventStartTime, setEventStartTime ] = useState<Date | null>(null);
    const [ eventEndTime, setEventEndTime ] = useState<Date | null>(null);

    const [ uploadedMotions, setUploadedMotions ] = useState<UploadState>(INITIAL_UPLOADSTATE);

    // Werte aus drei Eingabefeldern in zwei DateTime-Werte mit gleichem Datumsteil hineinzwängen.

    useEffect(() => {
        if (eventDate && eventStartTime) {
            let newValue = new Date(eventDate);
            newValue.setHours(eventStartTime.getHours(), eventStartTime.getMinutes(), 0, 0);
            setEventRequestData(eventRequestData => ({...eventRequestData, planedStartDate: newValue}));
        }
    }, [eventDate, eventStartTime]);

    useEffect(() => {
        if (eventDate && eventEndTime) {
            let newValue = new Date(eventDate);
            newValue.setHours(eventEndTime.getHours(), eventEndTime.getMinutes(), 0, 0);
            setEventRequestData(eventRequestData => ({...eventRequestData, planedEndDate: newValue}));
        }
    }, [eventDate, eventEndTime]);

    // Hochgeladene Vorlagen übernehmen.

    useEffect(() => {

        if (uploadedMotions.isSuccess && uploadedMotions.data && !eventRequestData.motions) {
            setEventRequestData({
                ...eventRequestData,
                motions: uploadedMotions.data.map(
                    (rowElements) => ({
                        id: uuidv4(),
                        votingTitle: rowElements[0],
                        question: rowElements[1],
                        description: rowElements[2],
                        options: rowElements.slice(3, rowElements.length-1).map(
                            (rowElement) => ({
                                votingOptionId: uuidv4(),
                                title: rowElement
                            })
                        )
                    })
                )
            })
        }
    }, [uploadedMotions, eventRequestData]);

    const eventIsComplete = eventRequestData.planedStartDate && eventRequestData.planedEndDate && eventRequestData.title && eventRequestData.motions;

    const createEvent = () => {
        createEventMutation.mutate({
            data: eventRequestData
        });
    }

    if (createEventMutation.isSuccess) {
        setVisible(false);
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={localeDe}>
            {
                visible &&
                <Card sx={{backgroundColor: "#f5f5f5"}} raised>
                    <CardContent component="form"
                                 noValidate
                                 autoComplete="off">
                        <Stack direction="column" spacing={2} sx={{my: 1, p: 1}} alignItems="center"
                               justifyContent="center">
                            <Stack direction="row" spacing={2} alignItems="baseline" justifyContent="center">
                                <DatePicker
                                    label="Datum"
                                    value={eventDate} onChange={setEventDate}
                                    renderInput={(params) => <TextField {...params}
                                                                        sx={{bgcolor: "#ffffff", width: 350}}/>}
                                />
                                <TimePicker
                                    label="Von"
                                    value={eventStartTime} onChange={setEventStartTime}
                                    renderInput={(params) => <TextField {...params}
                                                                        sx={{bgcolor: "#ffffff", width: 220}}/>}
                                />
                                <TimePicker
                                    label="Bis"
                                    value={eventEndTime} onChange={setEventEndTime}
                                    renderInput={(params) => <TextField {...params}
                                                                        sx={{bgcolor: "#ffffff", width: 220}}/>}
                                />
                            </Stack>
                            <FormControl sx={{m: 1, width: 820, height: 100}}>
                                <InputLabel htmlFor="event-title">Titel</InputLabel>
                                <OutlinedInput
                                    id="event-title"
                                    label="Titel"
                                    value={eventRequestData.title}
                                    onChange={e => setEventRequestData({...eventRequestData, title: e.target.value})}
                                    sx={{bgcolor: "#ffffff"}}/>
                            </FormControl>
                            <Paper variant="outlined"
                                   sx={{
                                       pt: 1, pb: 4, px: 2, mx: 1,
                                       backgroundColor: '#fff',
                                       textAlign: 'center',
                                       width: 820
                                   }}>
                                <CategoryTitle>Vorlagen</CategoryTitle>
                                <UploadCSV variant="contained" uploadState={uploadedMotions}
                                           setUploadState={setUploadedMotions} disabled={false}>
                                    CSV-Datei hochladen
                                </UploadCSV>
                                {
                                    eventRequestData?.motions &&
                                    <Typography variant="body2" color="text.secondary"
                                                sx={{my: 2, textAlign: "center"}}>
                                        {eventRequestData?.motions.length} Vorlage(n) importiert.
                                    </Typography>
                                }
                            </Paper>
                            <Stack direction="row" spacing={2} alignItems="baseline" justifyContent="flex-end"
                                   sx={{width: 820}}>
                                <Button variant="text" onClick={() => setVisible(false)}>Abbrechen</Button>
                                <LoadingButton
                                    variant="contained"
                                    onClick={() => createEvent()}
                                    loading={createEventMutation.isLoading}
                                    loadingPosition="end"
                                    endIcon={<SaveIcon/>}
                                    disabled={!eventIsComplete}
                                >
                                    Speichern
                                </LoadingButton>
                            </Stack>
                            {
                                createEventMutation.isError &&
                                <Alert severity="error">Anlegen des Events
                                    fehlgeschlagen: {createEventMutation.error?.toString()}</Alert>
                            }
                        </Stack>

                    </CardContent>
                </Card>
            }
        </LocalizationProvider>
    );
}
