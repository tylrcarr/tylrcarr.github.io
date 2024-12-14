import React from "react";
import Refrigerator from "../components/Refrigerator";
import {Box} from "@mui/material";

export const ArtPage = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh', // Make sure the parent fills the screen
            }}
        >
            <Refrigerator />
        </Box>
    );
}
