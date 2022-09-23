import {useContext, useEffect, useState} from "react";
import {EventMonitorContext} from "../provider/EventMonitorContextProvider";
import {getVotingEndTag, getVotingStartTag} from "../event/eventUtils";

export type VotingDialogState = {
    visibleDialog: 'NONE' | 'SHOW_PREVIEW' | 'NOTIFY_VOTING_STARTED' | 'VOTING' | 'NOTIFY_VOTING_ENDED' | 'SHOW_RESULTS';
    motionId: string | null;
    previousVotingStartedNotifications: string[];
    previousVotingEndedNotifications: string[];
}

export function useVotingDialogState() {

    // const setDialogStateWithLogging = (dialogState: DialogState) => {
    //     console.log('setDialogState', new Date(), dialogState.visibleDialog, dialogState.motionId, dialogState.previousVotingEndedNotifications);
    //     setDialogState(dialogState);
    // }

    return useState<VotingDialogState>({
        visibleDialog: 'NONE',
        motionId: null,
        previousVotingStartedNotifications: [],
        previousVotingEndedNotifications: [],
    });
}

export function useVotingStartEndNotifications(dialogState: VotingDialogState, setDialogState: (dialogState: VotingDialogState) => void) {

    const eventMonitor = useContext(EventMonitorContext);

    const shouldNotifyVotingStarted =
        eventMonitor.currentMotion
        && !dialogState.previousVotingStartedNotifications.includes(getVotingStartTag(eventMonitor.currentMotion));

    const shouldNotifyVotingEnded =
        !eventMonitor.currentMotion && eventMonitor.lastMotion
        && !dialogState.previousVotingEndedNotifications.includes(getVotingEndTag(eventMonitor.lastMotion));

    if (!shouldNotifyVotingEnded) {
        if (!eventMonitor.currentMotion && eventMonitor.lastMotion) {
            console.log('getVotingEndTag(eventMonitor.lastMotion)', getVotingEndTag(eventMonitor?.lastMotion));
            console.log('!includes', !dialogState.previousVotingEndedNotifications.includes(getVotingEndTag(eventMonitor.lastMotion)));
        }
        console.log('previousVotingEndedNotifications', JSON.stringify(dialogState.previousVotingEndedNotifications));
    }

    useEffect(() => {
        console.log(
            'useVoteDialogs:', new Date(),
            'shouldNotifyVotingStarted', shouldNotifyVotingStarted,
            'shouldNotifyVotingEnded', shouldNotifyVotingEnded,
            'currentMotion:', JSON.stringify(eventMonitor.currentMotion).slice(0,64),
            'lastMotion:', JSON.stringify(eventMonitor.lastMotion).slice(0,64),
            JSON.stringify(dialogState).slice(0,64)
        );

        if (dialogState.visibleDialog === "NONE") {
            // Ausgangslage: kein Dialog offen

            if (shouldNotifyVotingStarted) {
                // eine neue Wahl wurde gestartet
                console.log('start voting on:', getVotingStartTag(eventMonitor.currentMotion!));
                setDialogState({
                    ...dialogState,
                    visibleDialog: 'NOTIFY_VOTING_STARTED',
                    motionId: eventMonitor.currentMotion?.id || null,
                    previousVotingStartedNotifications: [...dialogState.previousVotingStartedNotifications, getVotingStartTag(eventMonitor.currentMotion!)],
                });

            } else if (shouldNotifyVotingEnded) {
                // eine neue Wahl wurde gestartet und bereits wieder beendet
                console.log('notify results on:', getVotingEndTag(eventMonitor.lastMotion!));
                setDialogState({
                    ...dialogState,
                    visibleDialog: 'NOTIFY_VOTING_ENDED',
                    motionId: eventMonitor.lastMotion?.id || null,
                    previousVotingEndedNotifications: [...dialogState.previousVotingEndedNotifications, getVotingEndTag(eventMonitor.lastMotion!)],
                });
            }

        } else if (dialogState.visibleDialog === "NOTIFY_VOTING_STARTED" || dialogState.visibleDialog === "VOTING") {
            // Ausgangslage: Start-Notifikation oder Wahl-Dialog sind offen

            if (shouldNotifyVotingEnded || shouldNotifyVotingStarted) {
                // Wahl wurde beendet, oder es wurde bereits eine andere Wahl gestartet
                // -> Dialog wird gecancelt. Wird im Abschnitt 'NONE' ggf. neu initialisiert.
                console.log('BB cancel voting on:', dialogState.motionId);
                setDialogState({
                    ...dialogState,
                    visibleDialog: 'NONE',
                    motionId: null,
                });
            }

        } else if (dialogState.visibleDialog === "NOTIFY_VOTING_ENDED") {
            // Ausgangslage: End-Notifikation ist offen

            if (shouldNotifyVotingStarted || shouldNotifyVotingEnded) {
                // Es wurde bereits eine andere Wahl gestartet oder beendet
                // -> Dialog wird gecancelt. Wird im Abschnitt 'NONE' ggf. neu initialisiert.
                console.log('AA cancel notification for:', dialogState.motionId);
                setDialogState({
                    ...dialogState,
                    visibleDialog: 'NONE',
                    motionId: null,
                });
            }

        } else if (dialogState.visibleDialog === "SHOW_PREVIEW") {
            // Ausgangslage: ein Vorschau-Dialog ist offen

            if (shouldNotifyVotingStarted) {
                // eine neue Wahl wurde gestartet -> Preview-Dialog wird gecancelt
                console.log('cancel preview');
                console.log('start voting on:', getVotingStartTag(eventMonitor.currentMotion!));
                setDialogState({
                    ...dialogState,
                    visibleDialog: 'NOTIFY_VOTING_STARTED',
                    motionId: eventMonitor.currentMotion?.id || null,
                    previousVotingStartedNotifications: [...dialogState.previousVotingStartedNotifications, getVotingStartTag(eventMonitor.currentMotion!)],
                });
            } else if (shouldNotifyVotingEnded) {
                // eine neue Wahl wurde gestartet und bereits wieder beendet -> Preview-Dialog wird gecancelt

                console.log('cancel preview');
                console.log('notify results on:', getVotingEndTag(eventMonitor.lastMotion!));
                setDialogState({
                    ...dialogState,
                    visibleDialog: 'NOTIFY_VOTING_ENDED',
                    motionId: eventMonitor.lastMotion?.id || null,
                    previousVotingEndedNotifications: [...dialogState.previousVotingEndedNotifications, getVotingEndTag(eventMonitor.lastMotion!)],
                });
            }

        } else if (dialogState.visibleDialog === "SHOW_RESULTS") {
            // Ausgangslage: ein  Resultats-Dialog ist offen

            if (shouldNotifyVotingStarted) {
                // eine neue Wahl wurde gestartet -> Resultats-Dialog wird gecancelt
                console.log('cancel result view for:', dialogState.motionId);
                console.log('start voting on:', getVotingStartTag(eventMonitor.currentMotion!));
                setDialogState({
                    ...dialogState,
                    visibleDialog: 'NOTIFY_VOTING_STARTED',
                    motionId: eventMonitor.currentMotion?.id || null,
                    previousVotingStartedNotifications: [...dialogState.previousVotingStartedNotifications, getVotingStartTag(eventMonitor.currentMotion!)],
                });
            } else if (shouldNotifyVotingEnded) {
                // eine neue Wahl wurde gestartet und bereits wieder beendet
                // -> Resultats-Dialog wird gecancelt, sofern es sich um einen anderen Vote handelt
                console.log('cancel result view for:', dialogState.motionId);
                console.log('notify results on:', getVotingEndTag(eventMonitor.lastMotion!));
                setDialogState({
                    ...dialogState,
                    visibleDialog: 'NOTIFY_VOTING_ENDED',
                    motionId: eventMonitor.lastMotion?.id || null,
                    previousVotingEndedNotifications: [...dialogState.previousVotingEndedNotifications, getVotingEndTag(eventMonitor.lastMotion!)],
                });
            }

        }


    }, [eventMonitor, dialogState, shouldNotifyVotingStarted, shouldNotifyVotingEnded]);
};


