import React, {useEffect, useState} from 'react';
import {
    Alert, Box, Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Typography,
} from "@mui/material";
import SetupSection from "./SetupSection";
import CategoryTitle from "../layout/CategoryTitle";
import UploadCSV, {INITIAL_UPLOADSTATE, UploadState} from "./UploadCSV";
import {useUserInvitationMutation} from "../api/persistence";
import {InviteUserRequestData} from "../api/model/invite-user-request-data";
import ProgressWithSuccess from "../user/ProgressWithSuccess";
import {Event} from "../api/model/event";

export type SetupParticipantsProps = { event: Event }

export default function SetupParticipants({ event }: SetupParticipantsProps) {

    const [ uploadedParticipants, setUploadedParticipants ] = useState<UploadState>(INITIAL_UPLOADSTATE);
    const userInvitationMutation = useUserInvitationMutation();

    type InviteUserQueueEntry = InviteUserRequestData | 'EMPTY' | 'EOF';
    type InviteUserQueue = InviteUserQueueEntry[];

    const [ inviteUserQueue, setInviteUserQueue ] = useState<InviteUserQueue>(['EMPTY']);

    useEffect(() => {
        if (uploadedParticipants.isLoading) {
            setInviteUserQueue(['EMPTY']);
        }

        if (uploadedParticipants.isSuccess && uploadedParticipants.data
            && !userInvitationMutation.isLoading && !userInvitationMutation.isError) {

            const [inviteUserQueueHead,...inviteUserQueueTail] = inviteUserQueue;

            if (inviteUserQueueHead === 'EMPTY') {

                const oneYearFromNow = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
                const inviteUserRequests: InviteUserRequestData[] = uploadedParticipants.data.map(
                    (row) => ({
                        firstName: row[0],
                        lastName: row[1],
                        email: row[2],
                        signature: null,
                        eventId: event.id,
                        eventTitle: event.title,
                        eventDateAndTime: event.eventDateAndTime!,
                        expiryDateTime: oneYearFromNow
                    }));

                setInviteUserQueue([...inviteUserRequests, 'EOF']);

            } else if (inviteUserQueueHead !== 'EOF') {

                console.log('sending invitation', inviteUserQueueHead.email);
                userInvitationMutation.mutate({
                    data: inviteUserQueueHead
                });
                setInviteUserQueue(inviteUserQueueTail);
            }

        }
    }, [uploadedParticipants, inviteUserQueue, setInviteUserQueue, event, userInvitationMutation]);

    const sendInvitationsInProgress = (userInvitationMutation.isLoading || (inviteUserQueue.length > 1)) && !userInvitationMutation.isError;
    const sendInvitationsSuccess = userInvitationMutation.isSuccess && (inviteUserQueue[0] === 'EOF');

    return (
        <SetupSection>
            <CategoryTitle>Teilnehmer per E-Mail einladen</CategoryTitle>
            <UploadCSV
                variant="contained"
                uploadState={uploadedParticipants}
                setUploadState={setUploadedParticipants}
                disabled={sendInvitationsInProgress}
            >
                CSV-Datei hochladen
            </UploadCSV>
            {
                uploadedParticipants.data &&
                <Box sx={{ mt:4, mb:2, mx:2 }}>
                    <TableContainer>
                        <Table size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Vorname</TableCell>
                                    <TableCell>Nachname</TableCell>
                                    <TableCell>E-Mail</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {uploadedParticipants.data.map((row, rowIndex) => (
                                    <TableRow
                                        key={rowIndex}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        {row.map((value, colIndex) => (
                                            <TableCell key={colIndex}>
                                                {value}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            }
            {
                (sendInvitationsInProgress || sendInvitationsSuccess) &&
                <Stack direction="row" spacing={4} alignItems="center" justifyContent="center" sx={{
                    mt: 2, mx: 2, pt: 2, borderTop: 1, borderColor: 'divider'
                }}>
                    <ProgressWithSuccess
                        loading={sendInvitationsInProgress}
                        success={sendInvitationsSuccess}/>
                    <Typography variant="subtitle1" color="text.secondary">
                        {sendInvitationsInProgress && ` Einladungen senden... (noch ${inviteUserQueue.length-1})`}
                        {sendInvitationsSuccess && `${uploadedParticipants.data?.length} Einladungen gesendet.`}
                    </Typography>
                </Stack>
            }
            {
                uploadedParticipants.isError &&
                <Alert severity="error">Upload fehlgeschlagen: {uploadedParticipants.error}</Alert>
            }
            {
                userInvitationMutation.isError &&
                <Alert severity="error">Einladungen senden fehlgeschlagen</Alert>
            }
        </SetupSection>

    );
}
