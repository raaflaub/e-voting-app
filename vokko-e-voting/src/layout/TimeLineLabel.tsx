import React, {ReactNode} from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

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
