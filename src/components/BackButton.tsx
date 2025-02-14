import React from "react";
import {IconButton} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useLocation, useNavigate} from "react-router-dom";

export const BackButton: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Check if there's history to navigate back
    const canGoBack = location.key !== "default"; // "default" key indicates no history

    if (!canGoBack) {
        return null; // Don't render the back button if there's no history
    }

    return (
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
    );
};
