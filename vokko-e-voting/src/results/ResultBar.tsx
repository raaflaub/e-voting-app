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
    maintainAspectRatio: false,
    responsive: true,
    plugins:
        {
            ChartDataLabels,
        legend: {
            position: 'right' as const,
            display: false
        },
        title: {
            display: false
        }

    },

    animation: {
        duration: 2000
    },

    layout: {

        padding: 0


    },
    scales: {
        x: {
            display: false,
            stacked: false,
            ticks: {

                display: false,
            },
            gridLines: {
                display: false,
                tickMarkLength: 0,

            },
            barThickness: 30,
            beginAtZero: true,

        },
        y: {
            display: false,
            stacked: false,
            ticks: {
                display: false,
            },
            gridLines: {
                display: false,

                tickMarkLength: 0,
            },
            barThickness: 50,
            beginAtZero: true,
            padding: -50


        },
    }
};





interface DatasetType {
    label: string;
    data: number[];
    borderColor: string[];
    backgroundColor: string[];
    datalabels: {};



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

    const optionsFiltered = ResultBarProps.options.filter(option => (option.voteCount ?? 0) > 0);

    function getDataSource():DataSourceType
    {
        const colorPalette:string[]  = ["#003f5c", "#2f4b7c", "#665191", "#a05195", "#ffa600","#f95d6a","#ff7c43","#ffa600"];
        const data:DataSourceType = {
            orientation: 'horizontal',
            labels: optionsFiltered.map(option => option.title ?? ''),
            datasets:  [ {
                    label : '',
                    data: optionsFiltered.map(option => option.voteCount ?? 0),
                    borderColor: colorPalette.reverse().slice(0,optionsFiltered.length),
                    backgroundColor: colorPalette.slice(0,optionsFiltered.length),
                    datalabels: {

                        formatter: (value: number,context:any) => {

                            let percentage = 0;

                            const totalVotes = optionsFiltered.reduce((total, option) => total + (option.voteCount ?? 0), 0);

                            if(totalVotes > 0)
                            {
                                percentage = Math.round(value/totalVotes * 100);

                            }

                            return context.chart.data.labels[context.dataIndex] + ' ' + percentage + '%';


                        },
                        color: 'white',
                        align: 'start',
                        anchor: 'end',

                    }}]};



        return data;
    }

    return (
        <Box sx={{ width: '100%', height: 50*optionsFiltered.length}}>
     <Bar options={options} data={getDataSource()}/>
        </Box>
        );
}
