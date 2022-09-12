import React, {ReactNode} from 'react';
import {Typography} from "@mui/material";

export type CategoryTitleProps = { children: ReactNode }

export default function CategoryTitle({ children }: CategoryTitleProps) {
    return (
        <Typography variant="h6" color="text.secondary" sx={{ my: 2, fontWeight: 300, textTransform: "uppercase"}} >
            { children }
        </Typography>
    );
}
