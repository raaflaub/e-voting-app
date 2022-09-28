import React, {ReactNode} from 'react';
import {Box, Button} from "@mui/material";

export type TimeLineButtonProps = {
    variant?: 'text' | 'outlined' | 'contained';
    onClick: () => void;
    children: ReactNode;
}

export default function TimeLineButton({ variant, onClick, children}: TimeLineButtonProps) {
    return (
        <Box sx={{ display: 'flex', width: '100%', flexDirection:'row',justifyContent:"center", py: 2  }}>
            <Button variant={variant} onClick={() => onClick()}>
                {children}
            </Button>
        </Box>
    );
}
