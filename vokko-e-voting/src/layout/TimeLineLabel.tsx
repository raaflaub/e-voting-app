import React, {ReactNode} from 'react';
import Typography from "@mui/material/Typography";

export type TimeLineLabelProps = {
    children: ReactNode
}

export default function TimeLineLabel({ children }: TimeLineLabelProps) {
    return (
        <Typography
            py={2}
            align="center"
            variant="body2"
            color="text-secondary"
            textTransform="uppercase"
        >
            {children}
        </Typography>
    );
}
