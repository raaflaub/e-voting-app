import React, {useContext, useState} from 'react';
import {AppBar, Avatar, Box, IconButton, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import { ArrowBackIos, AccountCircle }  from "@mui/icons-material";
import vokkoLogoSmall from "./vokkoLogoSmall.png";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../provider/UserContextProvider";
import UserAvatar from "../user/UserAvatar";

export type VokkoHeaderProps = { title?: string | null, backButton?: boolean, userProfile?: boolean }

export default function VokkoHeader( { title, backButton, userProfile } : VokkoHeaderProps) {

    const navigate = useNavigate();
    const user = useContext(UserContext);

    const [anchorElProfile, setAnchorElProfile] = useState<null | HTMLElement>(null);

    const handleOpenProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElProfile(event.currentTarget);
    };

    const handleCloseProfileMenu = () => {
        setAnchorElProfile(null);
    };

    return (
        <AppBar position="sticky">
            <Toolbar>

                { backButton &&
                    <IconButton color="inherit" sx={{ p:0 }} onClick={() => navigate(-1)}>
                        <ArrowBackIos />
                    </IconButton>
                }

                <img src={vokkoLogoSmall} alt="VOKKO Logo" style={{ width:80, height:16 }}/>

                { title &&
                    <Typography variant="h6" align="center" flexGrow={1}
                                sx={ { whiteSpace: 'nowrap',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      paddingLeft: '0.5rem',
                                      paddingRight: '0.5rem'
                                } }>
                        { '! ' + title + ' !' }
                    </Typography>
                    }

                { userProfile &&
                    <>
                        <Box sx={{ display: { xs: 'none', sm: 'flex' } }} >
                            <IconButton color="inherit" sx={{ pt:0, pb: 0, pr: 0 }}>
                                <UserAvatar user={user.value?.user ?? null}/>
                            </IconButton>
                            <Typography variant="h6" align="right" marginLeft={2}>
                                { user?.value?.user?.email }
                            </Typography>
                        </Box>
                        <Box sx={{ display: { xs: 'flex', sm: 'none' } }} >
                            <IconButton color="inherit" sx={{ p:0 }} onClick={handleOpenProfileMenu}>
                                <UserAvatar user={user.value?.user ?? null}/>
                            </IconButton>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElProfile}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElProfile)}
                                onClose={handleCloseProfileMenu}
                            >
                                <MenuItem disabled>
                                    { user?.value?.user?.email }
                                </MenuItem>
                            </Menu>
                        </Box>
                    </>
                }

            </Toolbar>
        </AppBar>
    );
}
