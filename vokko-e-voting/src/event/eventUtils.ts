import {Event} from '../api/model/event';
import {IVoting} from "../api/model/ivoting";

export function isFutureEvent(e: Event): boolean {
    return e.eventDateAndTime ? (e.eventDateAndTime >= new Date()) : false;
}

export function isPastEvent(e: Event): boolean {
    return e.eventDateAndTime ? (new Date(e.eventDateAndTime.getTime() + 7_200_000) <= new Date()) : false;
}

export function isCurrentEvent(e: Event): boolean {
    return (!isFutureEvent(e)) && (!isPastEvent(e));
}

export function getVotingStartTag(v: IVoting): string {
    return `${v.id}-${v.startDate}`;
}

export function getVotingEndTag(v: IVoting): string {
    return `${v.id}-${v.endDate}`;
}

export function getMotionById(e: Event, motionId: string | null): IVoting | undefined {
    return e.motions?.find(v => v.id === motionId)
}
