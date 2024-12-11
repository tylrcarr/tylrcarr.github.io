import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { useSnackbarQueue, SnackbarColor } from "../hooks/useSnackbarQueue.hook";

const POSITIVE_RESPONSES = [
    "Hey, thanks for that",
    "Appreciate it",
    "Thanks :)",
    "Glad you think so!",
    "Means a lot, thanks!"
];

const NEGATIVE_RESPONSES = [
    "If you're trying to be mean, it's kind of working",
    ":/",
    "Noted. You're on my shit list",
    "Hey, what the heck? :(",
    "I'm gonna ruminate on this later"
];


export const HomePage: React.FC = () => {
    const { addSnackbar } = useSnackbarQueue();

    const handlePositiveClick = () => {
        const message = POSITIVE_RESPONSES[Math.floor(Math.random() * POSITIVE_RESPONSES.length)];
        addSnackbar(message, SnackbarColor.Success);
    };

    const handleNegativeClick = () => {
        const message = NEGATIVE_RESPONSES[Math.floor(Math.random() * NEGATIVE_RESPONSES.length)];
        addSnackbar(message, SnackbarColor.Error);
    };

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                bgcolor: "background.default",
                color: "text.primary",
                p: 4,
            }}
        >
            <Typography variant="h2" sx={{ mb: 4 }}>
                Hey there, I’m Tyler!
            </Typography>
            <Typography variant="h5" sx={{ mb: 6, maxWidth: 600 }}>
                This is a space I built for my thoughts, photos, and projects. Thanks for visiting, leave feedback below.
            </Typography>
            <Box sx={{ display: "flex", gap: 3 }}>
                <IconButton
                    color="primary"
                    onClick={handlePositiveClick}
                    sx={{
                        "&:hover": { color: "success.main" },
                    }}
                >
                    <ThumbUpAltIcon />
                </IconButton>
                <IconButton
                    color="primary"
                    onClick={handleNegativeClick}
                    sx={{
                        "&:hover": { color: "error.main" },
                    }}
                >
                    <ThumbDownAltIcon />
                </IconButton>
            </Box>
        </Box>
    );
};
