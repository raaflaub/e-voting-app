import React from 'react';
import {IVoting} from "../api/model/ivoting";
import {Button, ButtonGroup, Typography} from "@mui/material";

export type VoteOptionsProps = { motion: IVoting, value?: string|null, onValueChanged?: (value: string|null) => void, disabled?: boolean }

export default function VoteOptions({ motion, value, onValueChanged, disabled }: VoteOptionsProps) {
    return (
        <Typography variant="body2">
            { disabled && <div>DISABLED</div>}
            <div>{JSON.stringify(motion.options)}</div>
            {
                !disabled && motion?.options && onValueChanged &&
                <ButtonGroup variant="outlined">
                    {
                        motion.options.map(
                            votingOption =>
                                <Button key={votingOption.votingOptionId} onClick={(e) => onValueChanged(votingOption.votingOptionId ?? null)}>
                                    {votingOption.title}
                                </Button>
                        )
                    }
                </ButtonGroup>
            }
        </Typography>
    );
}
