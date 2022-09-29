import React, {ReactNode} from 'react';
import Button from "@mui/material/Button";

export type StringTable = string[][];

export interface UploadState {
    data: StringTable | null;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    error: any;
}

export const INITIAL_UPLOADSTATE = {
    data: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: null,
}
export type UploadCSVProps = {
    variant: 'contained' | 'outlined' | 'text';
    uploadState: UploadState;
    setUploadState: (uploadState: UploadState) => void;
    children: ReactNode;
}

export default function UploadCSV({ variant, uploadState, setUploadState, children }: UploadCSVProps) {

    const parseCSVData = function(data: string, separator: string) {

        let parsedata: StringTable = [];
        let lines = data.split("\n");

        for(let i = 0; i < lines.length; i++) {
            parsedata.push(lines[i].split(separator))
        }

        setUploadState({ data: parsedata, isLoading: false, isSuccess: true, isError: false, error: null});
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event?.target?.files && event?.target?.files[0]) {

            try {
                setUploadState({ data: null, isLoading: true, isSuccess: false, isError: false, error: null});
                var reader = new FileReader();

                reader.addEventListener('load', function (e) {
                    let csvdata = e.target?.result;
                    if (typeof csvdata !== 'string') {
                        throw Error('file format not supported');
                    }
                    if (csvdata.includes(';'))
                        parseCSVData(csvdata, ';');
                    else
                        parseCSVData(csvdata, ',');
                });

                reader.readAsBinaryString(event?.target?.files[0]);
            } catch(e) {
                setUploadState({ data: null, isLoading: false, isSuccess: false, isError: true, error: e});
            }
        }
    }

    return (
        <Button variant="contained" component="label">
            {children}
            <input hidden accept="text/csv" multiple type="file" onChange={handleChange}/>
        </Button>
    );
}
