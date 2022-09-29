import React, {ReactNode} from 'react';
import {Paper} from "@mui/material";

export type SetupSectionProps = { children: ReactNode }

export default function SetupSection({ children }: SetupSectionProps) {
    return (
        <Paper
            elevation={12}
            sx={{
                pt:1, pb:4,
                backgroundColor: '#fff',
                textAlign: 'center',
            }}>
            {children}
        </Paper>
    );
}
