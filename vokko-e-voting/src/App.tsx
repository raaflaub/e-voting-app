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
import UserContextProvider from "./provider/UserContextProvider";
import {QueryClient, QueryClientProvider} from "react-query";
import CastVotesHistoryContextProvider from "./provider/CastVotesHistoryContextProvider";

const theme = createTheme();

function App() {

    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <UserContextProvider>
                <HubContextProvider>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <BrowserRouter>
                            <AppRoutes/>
                        </BrowserRouter>
                    </ThemeProvider>
                </HubContextProvider>
            </UserContextProvider>
        </QueryClientProvider>
    );
}

export default App;
