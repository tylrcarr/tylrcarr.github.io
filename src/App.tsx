import React from 'react';
import './App.css';
import {Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {RouteProvider} from "./hooks/use-router.hook";
import {Router} from "./Router";
import {RouteSelector} from "./components/RouteSelector";

const theme = createTheme({
    palette: {
        mode: "dark",
    }
})

function App() {
    return (
        <RouteProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <RouteSelector />
                <Container style={{marginTop: "60px"}}>
                    <Router />
                </Container>
            </ThemeProvider>
        </RouteProvider>
    );
}

export default App;
