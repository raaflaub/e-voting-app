import React from 'react';
import {Button, InputAdornment, OutlinedInput, Stack} from "@mui/material";
import {useTranslation} from "react-i18next";
import {isYesNoVote} from "./voteUtils";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import {IVoting} from "../api/model/ivoting";
import Popover from "@mui/material/Popover";

export type StartVoteControlProps = {
    motion: IVoting;
    onStartVote: (motion: IVoting) => void;
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
                        onChange={(e) => setVoteDurationMinutes(e.target.value ? parseInt(e.target.value, 10) : 1)}
                        type="number"
                        size="small"
                        endAdornment={<InputAdornment position="end">{t("minute_s")}</InputAdornment>}
                        inputProps={{max: 10, min: 1}}
                        sx={{ width:150 }}
                    />
                    <Button variant="contained" onClick={() => onStartVote(motion)} >
                        {t("start")}
                    </Button>
                </Stack>
            </Popover>
        </>
    );
}
