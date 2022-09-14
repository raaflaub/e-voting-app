import React from 'react';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {BrowserRouter} from "react-router-dom";
import AppRoutes from "./AppRoutes";
import {createTheme} from "@mui/material/styles";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {VOKKO_MESSAGING_HUB, configureAxios} from "./api/backend";
import Loading from "./landing/Loading";
import HubContextProvider from "./provider/HubContextProvider";

const theme = createTheme();

function App() {

    configureAxios();

    return (
        <HubContextProvider url={VOKKO_MESSAGING_HUB} loadingIndicator={<Loading/>}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                    <AppRoutes/>
                </BrowserRouter>
            </ThemeProvider>
        </HubContextProvider>
    );
}

export default App;
