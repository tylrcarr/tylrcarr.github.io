import React from 'react';
import './App.css';
import {Container, CssBaseline, ThemeProvider} from "@mui/material";
import {RouteSelector} from "./components/RouteSelector";
import theme from "./theme";
import {SnackbarProvider} from "./hooks/useSnackbarQueue.hook";
import {AppRouter} from "./AppRouter";
import {HashRouter} from "react-router-dom";


function App() {
    return (
        <HashRouter>
            <ThemeProvider theme={theme}>
                <SnackbarProvider>
                    <CssBaseline />
                    <RouteSelector />
                    <Container>
                        <AppRouter />
                    </Container>
                </SnackbarProvider>
            </ThemeProvider>
        </HashRouter>
    );
}

export default App;
