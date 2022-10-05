import {VotingOption} from "../api/model/voting-option";
import {IVoting} from "../api/model/ivoting";


export type VotingState = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'ACCEPTED' | 'REJECTED' | 'DRAW';

export const VOTING_STATE_TEXTS_DE = {
    'PENDING':     "status_pending",
    'IN_PROGRESS':  "status_in_progress",
    'COMPLETED':   "status_completed",
    'ACCEPTED':    "status_accepted",
    'REJECTED':    "status_rejected",
    'DRAW':        "status_draw",
};

function isYes(votingOption: VotingOption) {
    return votingOption.title && ['YES','JA'].includes(votingOption.title?.toUpperCase());
}

function isNo(votingOption: VotingOption) {
    return votingOption.title && ['NO','NEIN'].includes(votingOption.title?.toUpperCase());
}


export function isYesNoVote(options: VotingOption[] | null) {
    return options && options.find(isYes) && options.find(isNo);
}

function isVoteInProgress(motion: IVoting | null): boolean {
    const currentTime = new Date().getTime();
    if (motion?.startDate && motion?.endDate) {
        return (motion?.startDate.getTime() < currentTime) && (motion?.endDate.getTime() > currentTime);
    } else {
        return false;
    }
}

function isVoteCompleted(motion: IVoting | null): boolean {
    return motion?.endDate? (motion?.endDate.getTime() < new Date().getTime()): false;
}

export function isEndDateWithinTimeout(motion: IVoting | null, timeOutMs: number) {
    return motion?.endDate ? (motion?.endDate.getTime() + timeOutMs) >= (new Date().getTime()) : false;
}


export function getVoteResultState(motion: IVoting | null) {

    const numWinners = getNumWinners(motion);

    if (!motion?.options) {
        return 'PENDING';
    }

    if (isVoteInProgress(motion)) {
        return 'IN_PROGRESS'
    }

    if (!isVoteCompleted(motion)) {
        return 'PENDING';
    }

    const winningOptions = getWinningOptions(motion?.options, numWinners);

    if ((winningOptions.length !== numWinners) || (winningOptions.length === 0)) {
        return 'DRAW';  // Es gibt ein Patt, ein Stichentscheid ist notwendig
    } else if (!isYesNoVote(motion?.options)) {
        return 'COMPLETED';
    } else if (isYes(winningOptions[0])) {
        return 'ACCEPTED';
    } else {
        return 'REJECTED';
    }
}

function getWinningOptions(options: VotingOption[], numWinners: number = 1) {
    const sortedOptions = options.sort(
        (option1, option2) =>
            Math.sign((option2.voteCount ?? 0) - (option1.voteCount ?? 0))
    );

    // <numWinners> ist die Anzahl zu besetzenden Positionen bzw. die Anzahl Gewinner der Wahl.
    // Wenn mehrere Optionen dieselbe Stimmenzahl erreichen, kann es ein Patt geben, was einen Stichentscheid provoziert.
    // Wir geben alle möglichen Gewinner zurück. Das Array wird in diesem Fall länger als <numWinners>.
    if (sortedOptions.length > numWinners) {
        const requiredVotesThreshold = sortedOptions[numWinners-1].voteCount ?? 0;
        return sortedOptions.filter(
            (option) => (option.voteCount ?? 0) >= requiredVotesThreshold
        )
    } else {
        return sortedOptions;
    }
}

export function getWinningOptionsText(options: VotingOption[]) {
    return getWinningOptions(options)
        ?.map((votingOption: VotingOption) => votingOption.title)
        .join(", ")
        ?? "";
}

export function getDescriptionText(motion: IVoting) {
    let text = motion?.description ?? '';
    if (text.startsWith('<')) {
        return text.substring(text.indexOf('>')+1);
    } else {
        return text;
    }
}

export function getNumWinners(motion: IVoting | null) {
    let text = motion?.description ?? '';
    if (text.startsWith('<')) {
        return parseInt(text.substring(1, text.indexOf('>')), 10);
    } else {
        return 1;
    }
}

