import React from 'react';
import {Avatar, Box} from "@mui/material";
import {blue} from "@mui/material/colors";
import CheckIcon from "@mui/icons-material/Check";
import CircularProgress from "@mui/material/CircularProgress";

export type ProgressWithSuccessProps = {
    loading: boolean;
    success: boolean;
}

export default function ProgressWithSuccess({ loading, success }: ProgressWithSuccessProps ) {
    return (
        <Box sx={{ position:'relative' }}>
            <Avatar sx={{ bgcolor:loading? blue[50] : blue[700] }}>
                {success && <CheckIcon />}
            </Avatar>
                {
                    loading &&
                    <CircularProgress
                        sx={{
                            color: blue[700],
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            zIndex: 1,
                        }}
                    />
                }
        </Box>
    );
}
