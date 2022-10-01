import React from 'react';
import {Stack, Typography} from "@mui/material";
import {green, grey, red, yellow} from "@mui/material/colors";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import {IVoting} from "../api/model/ivoting";
import {getVoteResultState, getVoteResultText} from "../vote/voteUtils";

export type MotionStatusBarProps = {
    motion: IVoting
}

export default function MotionStatusBar({ motion }: MotionStatusBarProps) {
    const voteResultState = getVoteResultState(motion);
    const iconColor =
        voteResultState === 'COMPLETED' || voteResultState === 'ACCEPTED' ? green[700]
                : voteResultState === 'REJECTED' ? red[700]
                : voteResultState === 'DRAW' ? yellow[700]
                : grey[400];
    return (
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-start" sx={{
            my: 1, mx: 0, pt: 0
        }}>
            {
                (voteResultState === 'COMPLETED' || voteResultState === 'ACCEPTED') &&
                <CheckCircleIcon fontSize="small" sx={{ color: iconColor }} />
            }
            {
                (voteResultState === 'REJECTED') &&
                <CancelIcon fontSize="small" sx={{ color: iconColor }} />
            }
            {
                (voteResultState === 'DRAW') &&
                <RemoveCircleIcon fontSize="small" sx={{ color: iconColor }} />
            }
            <Typography variant="body2" color="text.secondary" textTransform="uppercase">
                {getVoteResultText(motion)}
            </Typography>
        </Stack>
    );
}
