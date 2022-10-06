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
import {useTranslation} from "react-i18next";

export type SetupParticipantsProps = { event: Event }

export default function SetupParticipants({ event }: SetupParticipantsProps) {

    const [ uploadedParticipants, setUploadedParticipants ] = useState<UploadState>(INITIAL_UPLOADSTATE);
    const userInvitationMutation = useUserInvitationMutation();

    type InviteUserQueueEntry = InviteUserRequestData | 'EMPTY' | 'EOF';
    type InviteUserQueue = InviteUserQueueEntry[];

    const {t} = useTranslation();

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
                        eventDateAndTime: (event.planedStartDate ?? event.eventDateAndTime ?? event.planedEndDate ?? event.endDateAndTime)!,
                        expiryDateTime: oneYearFromNow
                    }));

                setInviteUserQueue([...inviteUserRequests, 'EOF']);

            } else if (inviteUserQueueHead !== 'EOF') {

                console.log('sending invitation', inviteUserQueueHead.email, JSON.stringify({
                    data: inviteUserQueueHead
                }));
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
            <CategoryTitle>{t("invite_by_mail")}</CategoryTitle>
            <UploadCSV
                variant="contained"
                uploadState={uploadedParticipants}
                setUploadState={setUploadedParticipants}
                disabled={sendInvitationsInProgress}
            >
                {t("upload_csv")}
            </UploadCSV>
            {
                uploadedParticipants.data &&
                <Box sx={{ mt:4, mb:2, mx:2 }}>
                    <TableContainer>
                        <Table size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>{t("firstname")}</TableCell>
                                    <TableCell>{t("lastname")}</TableCell>
                                    <TableCell>{t("email")}</TableCell>
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
                        {sendInvitationsInProgress &&  `${t("sending_invites")} ... (${t("left")} ${inviteUserQueue.length-1})`}
                        {sendInvitationsSuccess && `${uploadedParticipants.data?.length} ${t("invites_sent")}.`}
                    </Typography>
                </Stack>
            }
            {
                uploadedParticipants.isError &&
                <Alert severity="error">{t("error_uploading")}: {uploadedParticipants.error}</Alert>
            }
            {
                userInvitationMutation.isError &&
                <Alert severity="error">{t("error_sending_invitations")}</Alert>
            }
        </SetupSection>

    );
}
