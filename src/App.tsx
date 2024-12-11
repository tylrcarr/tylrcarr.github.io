import React from 'react';
import './App.css';
import {Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {RouteProvider} from "./hooks/use-router.hook";
import {Router} from "./Router";
import {RouteSelector} from "./components/RouteSelector";
import theme from "./theme";
import {SnackbarProvider} from "./hooks/useSnackbarQueue.hook";


function App() {
    return (
        <RouteProvider>
            <ThemeProvider theme={theme}>
                <SnackbarProvider>
                    <CssBaseline />
                    <RouteSelector />
                    <Container style={{marginTop: "60px"}}>
                        <Router />
                    </Container>
                </SnackbarProvider>
            </ThemeProvider>
        </RouteProvider>
    );
}

export default App;
