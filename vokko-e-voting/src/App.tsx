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

const theme = createTheme();

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                 <AppRoutes/>
            </BrowserRouter>
        </ThemeProvider>
    );
/*  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Landing />} >
                  <Route path="*" element={<Navigate to="/"/>} />
              </Route>
              <Route path="/register" element={<UserRegistration />} />
              <Route path="/meet" element={<DefaultLayout />} />
              <Route path="/organize" element={<OrganizerLayout />} />
              <Route path="/test" element={<TestingArea />} />
          </Routes>
      </BrowserRouter>
  );*/
}

export default App;
