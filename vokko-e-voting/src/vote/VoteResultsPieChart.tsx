import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import {VotingOption} from "../api/model/voting-option";

ChartJS.register(ArcElement, Tooltip, Legend);

export interface DatasetType {
    data: number[];
    backgroundColor: string[];
}

export interface DataSourceType {

    labels: string[];
    datasets: DatasetType[];
}

export interface IVoteResultsPieChartProps {

    options: VotingOption[];
}

export default function VoteResultsPieChart(
    voteResultsPieChartProps: IVoteResultsPieChartProps

) {

    function getDataSource(): DataSourceType
    {
        const colorPalette:string[]  = ["#003f5c", "#2f4b7c", "#665191", "#a05195", "#ffa600","#f95d6a","#ff7c43","#ffa600"];
        const data: DataSourceType = {
            labels: voteResultsPieChartProps.options.map(option => option.title ?? ''),
            datasets: [
                {
                    data: voteResultsPieChartProps.options.map(option => option.voteCount ?? 0),
                    backgroundColor: colorPalette.reverse().slice(0,voteResultsPieChartProps.options.length)
                }
            ]
        };

        console.log(data);
        return data;
    }




    return (
        <Pie

            data={getDataSource()}
        />
    );
}


