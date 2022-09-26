import {IVoting} from "./ivoting";

export interface EventMonitor {
    state: number;
    usersOnlineCount: number;
    usersRegisteredCount: number;
    currentMotion: IVoting | null;
    lastMotion: IVoting | null;
    motionsCount: number;
    motionsCompletedCount: number;
}
