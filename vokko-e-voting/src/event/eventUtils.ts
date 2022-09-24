import {Event} from '../api/model/event';
import {IVoting} from "../api/model/ivoting";

export function isToday(e: Event): boolean {
    // toDateString beruecksichtigt die lokale Zeitzone
    return e.eventDateAndTime ? (e.eventDateAndTime.toDateString() === new Date().toDateString()) : false;
}

export function isFutureEvent(e: Event): boolean {
    return e.eventDateAndTime ? (e.eventDateAndTime >= new Date()) && !isToday(e): false;
}

export function isPastEvent(e: Event): boolean {
    return e.eventDateAndTime ? (e.eventDateAndTime <= new Date()) && !isToday(e): false;
}


export function getVotingStartTag(v: IVoting): string {
    return `${v.id}-${v.startDate?.toISOString()}`;
}

export function getVotingEndTag(v: IVoting): string {
    return `${v.id}-${v.endDate?.toISOString()}`;
}

export function getMotionById(e: Event, motionId: string | null): IVoting | undefined {
    return e.motions?.find(v => v.id === motionId)
}

