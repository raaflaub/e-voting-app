// https://api.vokko.cloud/swagger/index.html

import {Event} from '../api/model/event';

export function isFutureEvent(e: Event): boolean {
    return e.eventDateAndTime ? (e.eventDateAndTime >= new Date()) : false;
}

export function isPastEvent(e: Event): boolean {
    return e.eventDateAndTime ? (new Date(e.eventDateAndTime.getTime() + 7_200_000) <= new Date()) : false;
}

export function isCurrentEvent(e: Event): boolean {
    return (!isFutureEvent(e)) && (!isPastEvent(e));
}



