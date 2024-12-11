import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#8d7b68', // Muted brown
        },
        secondary: {
            main: '#d9cbb3', // Soft beige
        },
        background: {
            default: '#2f2f2f', // Charcoal base
            paper: '#3c3c3c', // Slightly lighter charcoal
        },
        text: {
            primary: '#f5f5f5', // Off-white
            secondary: '#b8b8b8', // Muted gray
        },
    },
    typography: {
        fontFamily: `'Roboto', 'Helvetica', 'Arial', sans-serif`,
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
            color: '#d9cbb3', // Beige for headers
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
            color: '#8d7b68', // Brown for secondary headers
        },
        body1: {
            fontSize: '1rem',
            color: '#f5f5f5',
        },
        caption: {
            fontSize: '0.85rem',
            color: '#b8b8b8', // Muted gray for captions
        },
    },
});

export default theme;
