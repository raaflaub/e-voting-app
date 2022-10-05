import React from 'react';
import {Button, InputAdornment, OutlinedInput, Stack, TextField} from "@mui/material";
import {useTranslation} from "react-i18next";
import {isYesNoVote} from "./voteUtils";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import {IVoting} from "../api/model/ivoting";
import Popover from "@mui/material/Popover";

export type StartVoteControlProps = {
    motion: IVoting;
    onStartVote: (durationMinutes: number) => void;
    voteDurationMinutes: number;
    setVoteDurationMinutes: (value: number) => void;
}

export default function StartVoteControl({ motion, voteDurationMinutes, setVoteDurationMinutes, onStartVote }: StartVoteControlProps) {
    const {t} = useTranslation();
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <Button onClick={handleClick}>
                {motion.options && isYesNoVote(motion.options)? `${t("vote")}`:`${t("election")}`}
                {<ArrowDropDown fontSize="small" />}
            </Button>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}    >
                <Stack direction="column" spacing={2} sx={{ p:2 }}>
                    <OutlinedInput
                        value={voteDurationMinutes}
                        onChange={(e) => setVoteDurationMinutes(e.target.value ? parseInt(e.target.value) : 1)}
                        type="number"
                        size="small"
                        endAdornment={<InputAdornment position="end">Minuten</InputAdornment>}
                        inputProps={{max: 10, min: 1}}
                        sx={{ width:135 }}
                    />
                    <Button variant="contained" onClick={() => onStartVote(voteDurationMinutes)} >
                        {t("start")}
                    </Button>
                </Stack>
            </Popover>
        </>
    );
}
