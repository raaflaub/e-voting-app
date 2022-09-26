import React from 'react';
import {Avatar} from "@mui/material";
import {IUser} from "../api/model/iuser";
import {blue} from "@mui/material/colors";

export type UserAvatarProps = { user: IUser | null }

function getFirstLetter(name: string) {
    return name?.slice(0,1).toUpperCase();
}
function getUserInitials( user: IUser | null ) {
    return getFirstLetter(user?.firstName ?? '') + getFirstLetter(user?.lastName ?? '')
}

export default function UserAvatar({ user }: UserAvatarProps) {
    return (
        <Avatar sx={{ bgcolor: blue[500] }}>{getUserInitials(user)}</Avatar>
    );
}
