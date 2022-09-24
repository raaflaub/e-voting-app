import {VotingOption} from "../api/model/voting-option";
import {CastVoteRequestData} from "../api/model/cast-vote-request-data";

export type VotingState = 'PENDING' | 'INPROGRESS' | 'COMPLETED' | 'ACCEPTED' | 'REJECTED' | 'TIE';

export function isYes(votingOption: VotingOption) {
    return votingOption.title && ['YES','JA'].includes(votingOption.title?.toUpperCase());
}

export function isNo(votingOption: VotingOption) {
    return votingOption.title && ['NO','NEIN'].includes(votingOption.title?.toUpperCase());
}

export function isYesNoVote(options: VotingOption[] | null) {
    return options && options.find(isYes) && options.find(isNo);
}

export function getVoteResultState(options: VotingOption[] | null) {
    if (!options || !isYesNoVote(options)) {
        return 'COMPLETED'
    }

    const voteCountBalance = options.reduce(
        (sum, votingOption) =>
            votingOption.voteCount === undefined ? sum
            : isYes(votingOption)                ? sum + votingOption.voteCount
            : isNo(votingOption)                 ? sum - votingOption.voteCount
            :                                      sum,
        0
    );

    return voteCountBalance > 0? 'ACCEPTED' : voteCountBalance < 0? 'REJECTED' : 'TIE';
}

