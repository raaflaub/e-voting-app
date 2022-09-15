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
import Loading from "./landing/Loading";
import HubContextProvider from "./provider/HubContextProvider";
import {configureAxios} from "./api/persistence";

const theme = createTheme();

function App() {

    configureAxios();

    return (
        <BrowserRouter>
            <HubContextProvider>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                         <AppRoutes/>
                </ThemeProvider>
            </HubContextProvider>
        </BrowserRouter>
    );
}

export default App;
