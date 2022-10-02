import React from 'react';
import {IVoting} from "../api/model/ivoting";
import VoteResultsPieChart from "./VoteResultsPieChart";
import {ResultBar} from "../results/ResultBar";


export type VoteResultsProps = { motion: IVoting }

export default function VoteResults({ motion }: VoteResultsProps) {
    return (

        // <div>
        //     <Typography variant="body2">
        //         Resultate: {JSON.stringify(motion.options)}
        //
        //     </Typography>
        //
        // </div>
    <ResultBar options={motion.options!} />


    );
}
