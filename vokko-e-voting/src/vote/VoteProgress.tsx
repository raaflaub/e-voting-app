import * as React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useTranslation} from "react-i18next";



function LinearProgressWithLabel(props: LinearProgressProps & { remaining: number, value: number }) {
    const {t} = useTranslation();

    function getVoteStatus(remainingTotalSeconds:number)
    {

        if(remainingTotalSeconds > 0)
        {
            return `${t("running")}`;


        }
        else
        {
            return `${t("ended")}`;
        }

    }
    function getRemainingTime(remainingTotalSeconds:number):string{

        const remainingSeconds = remainingTotalSeconds % 60;
        const remainingMinutes = (remainingTotalSeconds - remainingSeconds) / 60;
        return `${padNumber(remainingMinutes)}:${padNumber(remainingSeconds)} ${t("remaining")}`;
    }
    return (


        <Box sx={{ display: 'flex',width: '100%', flexDirection:'column'  }}>
            <Box sx={{ display: 'flex', width: '100%', flexDirection:'row',justifyContent:"space-between", padding: "15px 0 15px 0px"  }}>
                <Box sx={{ justifyContent: 'flex-start'}}>
                    <Typography variant="body2" color="text.secondary" textTransform="uppercase">
                        {getVoteStatus(props.remaining)}
                    </Typography>
                </Box>
                <Box sx={{ justifyContent: 'flex-end' }}>
                    <Typography variant="body2" color="text.secondary" textTransform="uppercase">{
                        getRemainingTime(props.remaining)
                    }</Typography>
                </Box>
            </Box>

            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
        </Box>
    );
}


function padNumber(number:number):string
{
    return number.toString().padStart(2,'0');

}
function getRemainingSeconds(endDate:Date):number {
    let DateNow = new Date();


    let remainingTotalSeconds = Math.round((endDate.getTime() - DateNow.getTime()) /1000);


    if (remainingTotalSeconds < 0) {
        remainingTotalSeconds = 0;
    }

    return remainingTotalSeconds;
}


function getProgress(totalTime:number,remainingSeconds:number): number{

    const progress:number = Math.round((totalTime - remainingSeconds)*100/ totalTime);




    return progress;

}

export default function VoteProgress(props: LinearProgressProps & { startDate: Date} & {endDate: Date; }) {


        const totalTime = (props.endDate.getTime() - props.startDate.getTime()) /1000;
        const [progress, setProgress] = React.useState(0);
        const [remainingSeconds,setRemainingSeconds] =  React.useState(getRemainingSeconds(props.endDate));

    React.useEffect(() => {

        const timer = setInterval(() => {
            setRemainingSeconds(getRemainingSeconds(props.endDate));
            // console.log("before set Progress");
            setProgress(getProgress(totalTime, remainingSeconds));

            if(progress >= 100)
            {
                clearInterval(timer);
            }
        }, 500);
        return () => {
            clearInterval(timer);
        };


    }, [remainingSeconds,progress,totalTime,props.endDate]);

    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgressWithLabel value={progress} remaining={remainingSeconds} />
        </Box>
    );

}
