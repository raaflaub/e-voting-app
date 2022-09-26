import {VotingOption} from "../api/model/voting-option";
import {IVoting} from "../api/model/ivoting";

export type VotingState = 'PENDING' | 'INPROGRESS' | 'COMPLETED' | 'ACCEPTED' | 'REJECTED' | 'TIE';

export const VOTING_STATE_TEXTS_DE = {
    'PENDING':    'Ausstehend',
    'INPROGRESS': 'Läuft...',
    'COMPLETED':  'Abgeschlossen',
    'ACCEPTED':   'Angenommen',
    'REJECTED':   'Abgelehnt',
    'TIE':        'Stichentscheid',
};

export function isYes(votingOption: VotingOption) {
    return votingOption.title && ['YES','JA'].includes(votingOption.title?.toUpperCase());
}

export function isNo(votingOption: VotingOption) {
    return votingOption.title && ['NO','NEIN'].includes(votingOption.title?.toUpperCase());
}

export function isYesNoVote(options: VotingOption[] | null) {
    return options && options.find(isYes) && options.find(isNo);
}

export function hasVotes(options: VotingOption[] | null) {
    return options && options.find(option => (option.voteCount ?? 0) > 0);
}

export function isVoteInProgress(motion: IVoting | null): boolean {
    const currentTime = new Date().getTime();
    if (motion?.startDate && motion?.endDate) {
        return (motion?.startDate.getTime() < currentTime) && (motion?.endDate.getTime() > currentTime);
    } else {
        return false;
    }
}

export function isVoteCompleted(motion: IVoting | null): boolean {
    return motion?.endDate? (motion?.endDate.getTime() < new Date().getTime()): false;
}

export function isEndDateWithinTimeout(motion: IVoting | null, timeOutMs: number) {
    return motion?.endDate ? (motion?.endDate.getTime() + timeOutMs) >= (new Date().getTime()) : false;
}


export function getVoteResultState(motion: IVoting | null) {

    if (!motion?.options) {
        return 'PENDING';
    }

    if (isVoteInProgress(motion)) {
        return 'INPROGRESS'
    }

    if (!isVoteCompleted(motion)) {
        return 'PENDING';
    }

    if (!isYesNoVote(motion?.options)) {
        return 'COMPLETED'
    }

    const voteCountBalance = motion?.options.reduce(
        (sum, votingOption) =>
            votingOption.voteCount === undefined ? sum
            : isYes(votingOption)                ? sum + votingOption.voteCount
            : isNo(votingOption)                 ? sum - votingOption.voteCount
            :                                      sum,
        0
    );

    return voteCountBalance > 0? 'ACCEPTED' : voteCountBalance < 0? 'REJECTED' : 'TIE';
}

