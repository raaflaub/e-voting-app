import {createContext, ReactNode, useState} from 'react';

export type CastVotesHistoryAPI = {
    castVoteTags: string[];
    addCastVote: (newVoteTag: string | null) => void;
    hasCastVote: (voteTag: string | null) => boolean;
};

// Der Kontext speichert, zu welchen Vorlagen der Benutzer bereits Stimmen abgegeben hat
// und dient dazu, clientseitig zu verhindern, dass zur gleichen Vorlage mehrmals abgestimmt wird.
// (Das Backend prueft dies ebenfalls.)

export const CastVotesHistoryContext = createContext<CastVotesHistoryAPI>({
    castVoteTags: [],
    addCastVote: (newVoteTag: string | null) => {},
    hasCastVote: (voteTag: string | null) => false,
});

export type CastVotesHistoryContextProviderProps = { children: ReactNode };

export default function CastVotesHistoryContextProvider({ children }: CastVotesHistoryContextProviderProps) {

    const [ castVoteTags, setCastVoteTags ] = useState<string[]>([]);
    const castVotesHistoryAPI = {
        castVoteTags,
        addCastVote: (newVoteTag: string | null) => newVoteTag && setCastVoteTags((voteTags: string[]) => [...voteTags, newVoteTag]),
        hasCastVote: (voteTag: string | null) => voteTag ? castVoteTags.includes(voteTag) : false,
    }

    return (
        <CastVotesHistoryContext.Provider value={castVotesHistoryAPI}>
            {children}
        </CastVotesHistoryContext.Provider>
    );
}

