import {useContext, useEffect, useState} from "react";
import {EventMonitorContext} from "../provider/EventMonitorContextProvider";
import {getVotingEndTag, getVotingStartTag} from "../event/eventUtils";
import {isEndDateWithinTimeout} from "./voteUtils";

export type VotingDialogState = {
    visibleDialog: 'NONE' | 'SHOW_PREVIEW' | 'NOTIFY_VOTING_STARTED' | 'VOTING' | 'NOTIFY_VOTING_ENDED' | 'SHOW_RESULTS';
    motionId: string | null;
    previousVotingStartedNotifications: string[];
    previousVotingEndedNotifications: string[];
}

const NOTIFY_VOTING_ENDED_TIMEOUT_MS = 30000;

export function useVotingStartEndNotifications(dialogState: VotingDialogState, setDialogState: (dialogState: VotingDialogState) => void) {

    const eventMonitor = useContext(EventMonitorContext);

    const shouldNotifyVotingStarted =
        eventMonitor.currentMotion
        && !dialogState.previousVotingStartedNotifications.includes(getVotingStartTag(eventMonitor.currentMotion));

    const shouldNotifyVotingEnded =
        !eventMonitor.currentMotion && eventMonitor.lastMotion && isEndDateWithinTimeout(eventMonitor.lastMotion, NOTIFY_VOTING_ENDED_TIMEOUT_MS)
        && !dialogState.previousVotingEndedNotifications.includes(getVotingEndTag(eventMonitor.lastMotion));

    useEffect(() => {
        if (dialogState.visibleDialog === "NONE") {
            // Ausgangslage: kein Dialog offen

            if (shouldNotifyVotingStarted) {
                // eine neue Wahl wurde gestartet
                setDialogState({
                    ...dialogState,
                    visibleDialog: 'NOTIFY_VOTING_STARTED',
                    motionId: eventMonitor.currentMotion?.id ?? null,   // Die generierten API-Modelklassen erlauben undefined. "?? null" macht daraus null
                    previousVotingStartedNotifications: [...dialogState.previousVotingStartedNotifications, getVotingStartTag(eventMonitor.currentMotion!)],
                });

            } else if (shouldNotifyVotingEnded) {
                // eine neue Wahl wurde gestartet und bereits wieder beendet
                setDialogState({
                    ...dialogState,
                    visibleDialog: 'NOTIFY_VOTING_ENDED',
                    motionId: eventMonitor.lastMotion?.id ?? null,
                    previousVotingEndedNotifications: [...dialogState.previousVotingEndedNotifications, getVotingEndTag(eventMonitor.lastMotion!)],
                });
            }

        } else if (dialogState.visibleDialog === "NOTIFY_VOTING_STARTED" || dialogState.visibleDialog === "VOTING") {
            // Ausgangslage: Start-Notifikation oder Wahl-Dialog sind offen

            if (shouldNotifyVotingEnded || shouldNotifyVotingStarted) {
                // Wahl wurde beendet, oder es wurde bereits eine andere Wahl gestartet
                // -> Dialog wird gecancelt. Wird im Abschnitt 'NONE' ggf. neu initialisiert.
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
                setDialogState({
                    ...dialogState,
                    visibleDialog: 'NOTIFY_VOTING_STARTED',
                    motionId: eventMonitor.currentMotion?.id ?? null,
                    previousVotingStartedNotifications: [...dialogState.previousVotingStartedNotifications, getVotingStartTag(eventMonitor.currentMotion!)],
                });
            } else if (shouldNotifyVotingEnded) {
                // eine neue Wahl wurde gestartet und bereits wieder beendet -> Preview-Dialog wird gecancelt

                setDialogState({
                    ...dialogState,
                    visibleDialog: 'NOTIFY_VOTING_ENDED',
                    motionId: eventMonitor.lastMotion?.id ?? null,
                    previousVotingEndedNotifications: [...dialogState.previousVotingEndedNotifications, getVotingEndTag(eventMonitor.lastMotion!)],
                });
            }

        } else if (dialogState.visibleDialog === "SHOW_RESULTS") {
            // Ausgangslage: ein  Resultats-Dialog ist offen

            if (shouldNotifyVotingStarted) {
                // eine neue Wahl wurde gestartet -> Resultats-Dialog wird gecancelt
                setDialogState({
                    ...dialogState,
                    visibleDialog: 'NOTIFY_VOTING_STARTED',
                    motionId: eventMonitor.currentMotion?.id ?? null,
                    previousVotingStartedNotifications: [...dialogState.previousVotingStartedNotifications, getVotingStartTag(eventMonitor.currentMotion!)],
                });
            } else if (shouldNotifyVotingEnded) {
                // eine neue Wahl wurde gestartet und bereits wieder beendet
                // -> Resultats-Dialog wird gecancelt, sofern es sich um einen anderen Vote handelt
                setDialogState({
                    ...dialogState,
                    visibleDialog: 'NOTIFY_VOTING_ENDED',
                    motionId: eventMonitor.lastMotion?.id ?? null,
                    previousVotingEndedNotifications: [...dialogState.previousVotingEndedNotifications, getVotingEndTag(eventMonitor.lastMotion!)],
                });
            }

        }


    }, [eventMonitor, dialogState, setDialogState, shouldNotifyVotingStarted, shouldNotifyVotingEnded]);
};


