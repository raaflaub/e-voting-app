import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import {VotingOption} from "../api/model/voting-option";
import {Box} from "@mui/material";



ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);


export const options = {
    indexAxis: 'y' as const,

    maintainAspectRatio: true,
    responsive: true,
    plugins:
        {
            ChartDataLabels,
        legend: {
            position: 'bottom' as const,
            display: false
        },
        title: {
            display: false
        }

    },
    // Core options
    aspectRatio: 5 / 3,
    layout: {
        padding: {
            top: 24,
            right: 16,
            bottom: 0,
            left: 8
        }
    },
    scales: {
        x: {
            display: false,
            stacked: false,
            barPercentage: 1
        },
        y: {
            display: false,
            stacked: false,
            barPercentage: 1
        },
    }
};



interface DatasetType {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    datalabels: {}
}

interface DataSourceType {
    orientation: 'horizontal' | 'vertical';
    labels: string[];
    datasets: DatasetType[];


}
export interface IResultBarProps {

    options: VotingOption[];

}
export function ResultBar(ResultBarProps:IResultBarProps) {

    function getDataSource():DataSourceType
    {
        const colorPalette:string[]  = ["#003f5c", "#2f4b7c", "#665191", "#a05195", "#ffa600","#f95d6a","#ff7c43","#ffa600"];
        const data:DataSourceType = {
            orientation: 'horizontal',
            labels: ResultBarProps.options.map(option => option.title ?? ''),
            datasets:  ResultBarProps.options.map((option,index):DatasetType => {
                return {
                    label : option.title!,
                    data: [option.voteCount!],
                    borderColor: colorPalette.reverse().slice(0,ResultBarProps.options.length)[index],
                    backgroundColor: colorPalette.slice(0,ResultBarProps.options.length)[index],
                    datalabels: {

                        formatter: (value: number) => {

                            let percentage = 0;

                            const totalVotes = ResultBarProps.options.reduce((total, option) => total + (option.voteCount ?? 0), 0);

                            if(totalVotes > 0)
                            {
                                percentage = Math.round(value/totalVotes * 100);

                            }


                            return option.title! + ' ' + percentage + '%';

                        },
                        color: 'white',
                        align: 'start',
                        anchor: 'start',

                    }
                }})

        };

        return data;
    }
    return (
    <Box >
     <Bar options={options} data={getDataSource()}  />
        </Box>
        );
}