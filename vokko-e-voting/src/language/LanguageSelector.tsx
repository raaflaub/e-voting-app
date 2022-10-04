import React from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListSubheader from "@mui/material/ListSubheader";

const languageMap:any = {
    en: { label: "English", dir: "ltr", active: true },
    de: { label: "Deutsch", dir: "ltr", active: false }
};

const LanguageSelector = () => {
    const selected =  localStorage.getItem("i18nextLng") || "en";
    const { t } = useTranslation();


    const [menuAnchor, setMenuAnchor] = React.useState<HTMLButtonElement| null>(null);
    React.useEffect(() => {
        document.body.dir = languageMap[selected].dir;
    }, [menuAnchor, selected]);



    return (
        <>
            <Button onClick={({ currentTarget }) => setMenuAnchor(currentTarget)} variant="contained">
                {languageMap[selected].label}
                <ArrowDropDown fontSize="small" />
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
