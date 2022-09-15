import {IVoting} from "./ivoting";

export interface EventMonitor {
    state: number;
    usersOnlineCount: number;
    usersRegisteredCount: number;
    currentMotion: IVoting | null;
}
