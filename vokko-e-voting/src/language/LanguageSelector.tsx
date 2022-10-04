import React from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListSubheader from "@mui/material/ListSubheader";
import {Typography} from "@mui/material";

const languageMap:any = {
    en: { label: "English", dir: "ltr", active: true },
    de: { label: "Deutsch", dir: "ltr", active: false }
};

const LanguageSelector = () => {

    const i18nextLng = localStorage.getItem("i18nextLng") || "de";
    const selected = (i18nextLng.slice(0,2) === 'de' ? 'de' : 'en');

    const { t } = useTranslation();


    const [menuAnchor, setMenuAnchor] = React.useState<HTMLButtonElement| null>(null);
    React.useEffect(() => {
        document.body.dir = languageMap[selected].dir;
    }, [menuAnchor, selected]);

    function abbreviate(label: any, numChars: number) {
        if (typeof label === 'string') {
            return label.slice(0,numChars)
        } else {
            return label;
        }
    }

    return (
        <>
            <Button onClick={({ currentTarget }) => setMenuAnchor(currentTarget)}
                    variant="text"
                    color="inherit"
                    sx={{ ml:2, mr:0 }}
            >
                <Typography variant="h6" align="right">
                { abbreviate(languageMap[selected]?.label, 2)}
                </Typography>
                {   <ArrowDropDown fontSize="small" />   }
            </Button>
            <Popover
                open={!!menuAnchor}
                anchorEl={menuAnchor}
                onClose={() => setMenuAnchor(null)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
            >
                <div>
                    <List>
                        <ListSubheader>{t("select_language")}</ListSubheader>
                        {Object.keys(languageMap)?.map(item => (
                            <ListItem
                                button
                                key={item}
                                onClick={() => {
                                    i18next.changeLanguage(item);
                                    setMenuAnchor(null);
                                }}
                            >
                                {languageMap[item].label}
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Popover>
        </>
    );
};

export default LanguageSelector;
