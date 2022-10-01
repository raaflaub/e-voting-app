import React, {ReactNode} from 'react';
import {Box, Button} from "@mui/material";

export type TimeLineButtonProps = {
    variant?: 'text' | 'outlined' | 'contained';
    disabled?: boolean;
    onClick: () => void;
    children: ReactNode;
}

export default function TimeLineButton({ variant, disabled, onClick, children}: TimeLineButtonProps) {
    return (
        <Box sx={{ display: 'flex', width: '100%', flexDirection:'row',justifyContent:"center", py: 2  }}>
            <Button variant={variant} disabled={disabled} onClick={() => onClick()}>
                {children}
            </Button>
        </Box>
    );
}
