import React from "react";
import {Box, Typography} from "@mui/material";

export const AboutPage = () => {
    return (
        <Box
            sx={{
                padding: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
            }}
        >
            <Typography variant="h4" sx={{mb: 2}}>
                About Me
            </Typography>
            <Typography variant="body1" sx={{maxWidth: 600}}>
                Hi, I’m Tyler! I’m a software engineer with a passion for coding, photography, and creating meaningful
                experiences. This site is a blend of my work, hobbies, and a little slice of my personality. There is
                more to come!
            </Typography>
        </Box>
    );
};
