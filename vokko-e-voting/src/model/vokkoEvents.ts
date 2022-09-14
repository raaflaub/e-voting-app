// https://api.vokko.cloud/swagger/index.html

import {Event} from './event';

export function isFutureEvent(e: Event): boolean {
    return e.eventDateAndTime ? (e.eventDateAndTime >= new Date()) : false;
}

export function isPastEvent(e: Event): boolean {
    return e.eventDateAndTime ? (new Date(e.eventDateAndTime.getTime() + 7_200_000) <= new Date()) : false;
}

export function isCurrentEvent(e: Event): boolean {
    return (!isFutureEvent(e)) && (!isPastEvent(e));
}

export interface Motion {
    id:	string;
    votingTitle: string;
    description: string | null;
    ownerId: string | null;
    startDate: Date;
    endDate: Date;
    timeout: number;
    options: VotingOption[];
}

export interface VotingOption {
    votingOptionId: string;
    title: string;
}

export interface EventMonitor {
    state: number;
    usersOnlineCount: number;
    usersRegisteredCount: number;
    currentMotion: Motion | null;
}

