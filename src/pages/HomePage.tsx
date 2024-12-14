import React, {useEffect, useState} from "react";
import {Box, IconButton, Typography} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import {FeedbackCounts, FeedbackService} from "../services/FeedbackService";

export const HomePage: React.FC = () => {
    const [feedbackCounts, setFeedbackCounts] = useState<FeedbackCounts>({ thumbs_up: 0, thumbs_down: 0 });

    // Load feedback counts
    useEffect(() => {
        (async () => setFeedbackCounts(await FeedbackService.getCounts()))();
    }, []);

    // Handle feedback actions
    const handleFeedback = async (type: "thumbs_up" | "thumbs_down") => {
        try {
            await FeedbackService.submit(type);
            const counts = await FeedbackService.getCounts();
            setFeedbackCounts(counts);
        } catch (error) {
            console.error("Error handling feedback:", error);
        }
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
                <Box sx={{ textAlign: "center" }}>
                    <IconButton
                        color="primary"
                        onClick={() => handleFeedback("thumbs_up")}
                        sx={{
                            "&:hover": { color: "success.main" },
                        }}
                    >
                        <ThumbUpAltIcon />
                    </IconButton>
                    <Typography variant="body1">{feedbackCounts.thumbs_up}</Typography>
                </Box>
                <Box sx={{ textAlign: "center" }}>
                    <IconButton
                        color="primary"
                        onClick={() => handleFeedback("thumbs_down")}
                        sx={{
                            "&:hover": { color: "error.main" },
                        }}
                    >
                        <ThumbDownAltIcon />
                    </IconButton>
                    <Typography variant="body1">{feedbackCounts.thumbs_down}</Typography>
                </Box>
            </Box>
        </Box>
    );
};
