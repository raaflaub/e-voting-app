import React from 'react';
import {AppBar, IconButton, Toolbar, Typography} from "@mui/material";
import { ArrowBackIos, AccountCircle }  from "@mui/icons-material";
import vokkoLogoSmall from "./vokkoLogoSmall.png";
import {useNavigate} from "react-router-dom";
import {currentUser} from "../model/vokkoUsers";

export type VokkoHeaderProps = { title: string, backButton: boolean, userProfile: boolean }

export default function VokkoHeader( { title, backButton, userProfile } : VokkoHeaderProps) {
    const navigate = useNavigate();
    return (
        <AppBar position="sticky">
            <Toolbar>

                { backButton &&
                    <IconButton color="inherit" onClick={() => navigate(-1)}>
                        <ArrowBackIos />
                    </IconButton>
                }

                <img src={vokkoLogoSmall} alt="VOKKO Logo" style={{ width:80, height:16 }}/>

                { title &&
                    <Typography variant="h6" align="center" flexGrow={1}
                                sx={{ whiteSpace: 'nowrap',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      paddingLeft: '0.5rem',
                                      paddingRight: '0.5rem'
                                }}>
                        { title }
                    </Typography>
                    }

                { userProfile &&
                    <>
                    <Typography variant="h6" align="right" sx={{ display: { xs: 'none', sm: 'flex' }, mr: 1 }} >
                        { currentUser.email }
                    </Typography>
                    <IconButton color="inherit" onClick={() => navigate(-1)}>
                        <AccountCircle />
                    </IconButton>
                    </>
                }

            </Toolbar>
        </AppBar>
    );
}
