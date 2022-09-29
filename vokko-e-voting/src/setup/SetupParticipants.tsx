import React, {useState} from 'react';
import {Typography} from "@mui/material";
import SetupSection from "./SetupSection";
import Button from "@mui/material/Button";
import CategoryTitle from "../layout/CategoryTitle";

export type SetupParticipantsProps = {}

export default function SetupParticipants({}: SetupParticipantsProps) {

    const [ filelist, setFilelist ] = useState('nothing selected')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilelist('event.target.files = ' + JSON.stringify(event.target.files))
        if (event?.target?.files && event?.target?.files[0]) {
            setFilelist(filelist => ` ... createObjectURL('${JSON.stringify(event!.target!.files![0])}')` );
            var myFile = event?.target?.files[0];
            var reader = new FileReader();

            reader.addEventListener('load', function (e) {

                let csvdata = e.target?.result;
                if(typeof csvdata === 'string') {
                    console.log('we have string csvdata:', csvdata);
                    if (csvdata.includes(';'))
                        getParsecsvdata(csvdata,';');
                    else
                        getParsecsvdata(csvdata,',');
                }
            });

            reader.readAsBinaryString(myFile);
        }
    }

    const getParsecsvdata = function(data: string, separator: string) {

        let parsedata = [];

        let newLinebrk = data.split("\n");
        for(let i = 0; i < newLinebrk.length; i++) {

            parsedata.push(newLinebrk[i].split(separator))
        }

        console.table(parsedata);
    }

    return (
        <SetupSection>
            <CategoryTitle>Teilnehmer einladen</CategoryTitle>
            <Button variant="contained" component="label">
                CSV-Datei hochladen
                <input hidden accept="text/csv" multiple type="file" onChange={handleChange}/>
            </Button>
            <Typography variant="body2">{filelist}</Typography>
        </SetupSection>

    );
}
