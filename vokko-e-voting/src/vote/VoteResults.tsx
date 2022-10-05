import React from 'react';
import {IVoting} from "../api/model/ivoting";
import {ResultBar} from "../results/ResultBar";


export type VoteResultsProps = { motion: IVoting }

export default function VoteResults({ motion }: VoteResultsProps) {
    return (

    <ResultBar options={motion.options!} />


    );
}
