import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import {VotingOption} from "../api/model/voting-option";
import {useTranslation} from "react-i18next";



export interface IVoteOptionsProps{

    options?: VotingOption[] | null;
    voteOptionCount: number;
    onSelectionChanged?: (ids:string[]) => void;
    disabled?: boolean;
}


export default function VoteOptionsControl(voteOptionsProps:IVoteOptionsProps) {

    const {t} = useTranslation();
    const [state, setState] = React.useState(voteOptionsProps.options?.map(option => { return ( {...option,checked: false}) }));
    const [error,setError] = React.useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {


        setState(


            prevState => {

                const map = new Map(
                    prevState?.map(option =>
                    {
                        if(voteOptionsProps.voteOptionCount === 1)
                        {
                            return ( [option.votingOptionId,{votingOptionId: option.votingOptionId,title: option.title,checked: false}]);
                        }
                        else
                        {
                            return ( [option.votingOptionId,{votingOptionId: option.votingOptionId,title: option.title,checked: option.checked}]);
                        }
                    }
                        )
                    );


                // @ts-ignore
                map.set(event.target.name,{...map.get(event.target.name),checked: event.target.checked});

                const newData = Array.from(map.values());

                const checkedIds = newData.filter((v) => v.checked).map(option => option.votingOptionId ?? '');
                if(checkedIds.length > voteOptionsProps.voteOptionCount)
                {

                    setError(true);



                    return prevState;
                }
                else {
                    setError(false);
                    if(voteOptionsProps.onSelectionChanged !== undefined) {
                        voteOptionsProps.onSelectionChanged(checkedIds);
                    }

                    return newData;
                }


            }





           );

    };





    return (


        <Box sx={{ display: 'flex' }} >

            <FormControl
                required
                error={error}
                component="fieldset"
                sx={{ m: 0 }}
                variant="standard"
            >
                <FormLabel disabled={voteOptionsProps.disabled} component="legend">{t("choose_options_part1")} {voteOptionsProps.voteOptionCount} {t("choose_options_part2")}</FormLabel>


                <FormGroup>

                    {state?.map(option => { return (


                            <FormControlLabel key={option.votingOptionId}
                                              control={
                                    <Checkbox disabled={voteOptionsProps.disabled} checked={option.checked} onChange={handleChange} name={option.votingOptionId?.toString()} />
                                }
                                label={option.title}
                            />

                    )})}

                </FormGroup>
                <FormHelperText>{error ? `${t("error_too_many_selected")}` : ''}</FormHelperText>
            </FormControl>
        </Box>
    );
}
