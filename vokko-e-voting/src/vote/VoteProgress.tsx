import * as React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(props: LinearProgressProps & { remaining: number, value: number }) {
    return (


        <Box sx={{ display: 'flex',width: '100%', flexDirection:'column'  }}>
            <Box sx={{ display: 'flex', width: '100%', flexDirection:'row',justifyContent:"space-between", padding: "15px 0 15px 0px"  }}>
                <Box sx={{ justifyContent: 'flex-start'}}>
                    <Typography variant="body2" color="text.secondary">
                        {getVoteStatus(props.remaining)}
                    </Typography>
                </Box>
                <Box sx={{ justifyContent: 'flex-end' }}>
                    <Typography variant="body2" color="text.secondary">{
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

function getRemainingTime(remainingTotalSeconds:number):string{

    const remainingSeconds = remainingTotalSeconds % 60;
    const remainingMinutes = (remainingTotalSeconds - remainingSeconds) / 60;
    return `${padNumber(remainingMinutes)}:${padNumber(remainingSeconds)} REMAINING`;
}
function padNumber(number:number):string
{
    return number.toString().padStart(2,'0');

}
function getRemainingSeconds(endDate:Date):number {
    let DateNow = new Date();

    //console.log("Now: ", DateNow);
    //console.log("End Date: ", endDate);

    let remainingTotalSeconds = Math.round((endDate.getTime() - DateNow.getTime()) /1000);

    console.log("Calculated seconds: ", remainingTotalSeconds);

    if (remainingTotalSeconds < 0) {
        remainingTotalSeconds = 0;
    }

    //console.log('Remaining: ' +  remainingTotalSeconds);

    return remainingTotalSeconds;
}
function getVoteStatus(remainingTotalSeconds:number)
{

    if(remainingTotalSeconds > 0)
    {
        return "IN PROGRESS";


    }
    else
    {
        return "ENDED";
    }

}

function getProgress(totalTime:number,remainingSeconds:number): number{

    const progress:number = Math.round((totalTime - remainingSeconds)*100/ totalTime);

    console.log("Total Time: ",totalTime);
    console.log("Remaining seconds: ",remainingSeconds);
    console.log("Progress: ",progress);


    return progress;

}

export default function VoteProgress(props: LinearProgressProps & { endDate: Date }) {

        const [totalTime] = React.useState(getRemainingSeconds(props.endDate));
        const [progress, setProgress] = React.useState(0);
        const [remainingSeconds,setRemainingSeconds] =  React.useState(getRemainingSeconds(props.endDate));

    React.useEffect(() => {

        const timer = setInterval(() => {
            setRemainingSeconds(getRemainingSeconds(props.endDate));
            console.log("before set Progress");
            setProgress(getProgress(totalTime, remainingSeconds));

            if(progress >= 100)
            {
                clearInterval(timer);
            }
        }, 800);
        return () => {
            clearInterval(timer);
        };


    }, [remainingSeconds]);

    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgressWithLabel value={progress} remaining={remainingSeconds} />
        </Box>
    );

}