import React from "react";
import { Box, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useLocation } from "react-router-dom";

export const BackButton: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Check if there's history to navigate back
    const canGoBack = location.key !== "default"; // "default" key indicates no history

    if (!canGoBack) {
        return null; // Don't render the back button if there's no history
    }

    return (
        <Box
            sx={{
                position: "absolute",
                top: 16, // Positioned at the top
                left: 16, // Positioned on the left
                zIndex: 10,
            }}
        >
            <IconButton
                onClick={() => navigate(-1)} // Navigate back
                sx={{
                    color: "secondary.main", // Sets the icon color to secondary
                    transition: "color 0.3s ease", // Smooth color transition
                    "&:hover": {
                        color: "secondary.light", // Secondary hover effect
                    },
                }}
            >
                <ArrowBackIcon fontSize="large" />
            </IconButton>
        </Box>
    );
};
