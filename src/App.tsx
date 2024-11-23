import React, {useState} from 'react';
import './App.css';
import {Button, Container, createTheme, CssBaseline, ThemeProvider, Typography} from "@mui/material";

const theme = createTheme({
    palette: {
        mode: "dark",
    }
})

function App() {
    const [count, setCount] = useState<number>(0);
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container>
                <Typography variant="body1">{count}</Typography>
                <Button onClick={() => setCount(prev => prev + 1)}>click</Button>
            </Container>
        </ThemeProvider>
    );
}

export default App;
