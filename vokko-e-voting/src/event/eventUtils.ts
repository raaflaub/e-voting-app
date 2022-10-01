import {Event} from '../api/model/event';
import {IVoting} from "../api/model/ivoting";

export function getDateString(dateTime: Date | null) {
    return dateTime?.toLocaleDateString() ?? '';
}

export function getTimeString(dateTime: Date | null) {
    return dateTime?.toLocaleTimeString() ?? '';
}

export function isToday(e: Event): boolean {

    // wir nehmen das erste Feld, das gesetzt ist, in dieser Reihenfolge.
    const dateTime = e.planedStartDate ?? e.planedEndDate ?? e.eventDateAndTime ?? e.endDateAndTime;

    // toDateString beruecksichtigt die lokale Zeitzone
    return dateTime ? (dateTime.toDateString() === new Date().toDateString()) : false;
}

export function isFutureEvent(e: Event): boolean {

    // wir nehmen das erste Feld, das gesetzt ist, in dieser Reihenfolge.
    const dateTime = e.planedStartDate ?? e.planedEndDate ?? e.eventDateAndTime ?? e.endDateAndTime;

    return dateTime ? (dateTime >= new Date()) && !isToday(e): false;
}

export function isPastEvent(e: Event): boolean {

    // wir nehmen das erste Feld, das gesetzt ist, in dieser Reihenfolge.
    const dateTime = e.planedStartDate ?? e.planedEndDate ?? e.eventDateAndTime ?? e.endDateAndTime;

    return dateTime ? (dateTime <= new Date()) && !isToday(e): false;
}


export function getVotingStartTag(v: IVoting): string {
    return `${v.id}-${v.startDate?.toISOString()}`;
}

export function getVotingEndTag(v: IVoting): string {
    return `${v.id}-${v.endDate?.toISOString()}`;
}

export function getMotionById(e: Event, motionId: string | null): IVoting | null {
    return e.motions?.find(v => v.id === motionId) ?? null
}

