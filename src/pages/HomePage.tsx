import React, {useEffect, useState} from "react";
import {Box, IconButton, Typography} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import {FeedbackCounts, FeedbackService} from "../services/FeedbackService";
import {SnackbarColor, useSnackbarQueue} from "../hooks/use-snackbar-queue.hook";
import {RESPONSES} from "../constants/responses";

export const HomePage: React.FC = () => {
    const [feedbackCounts, setFeedbackCounts] = useState<FeedbackCounts>({
        thumbs_up: 0,
        thumbs_down: 0,
    });
    const [clickCount, setClickCount] = useState<number>(0); // Local click counter
    const [flipped, setFlipped] = useState<boolean>(false); // Track if buttons are flipped
    const {addSnackbar} = useSnackbarQueue();

    // Load initial feedback counts
    useEffect(() => {
        (async () => {
            const counts = await FeedbackService.getCounts();
            setFeedbackCounts(counts);
        })();
    }, []);

    // Handle feedback actions
    const handleFeedback = async (type: "thumbs_up" | "thumbs_down") => {
        try {
            await FeedbackService.incrementFeedback(type);

            // Optimistically update the local state
            setFeedbackCounts((prev) => ({
                ...prev,
                [type]: prev[type] + 1,
            }));

            // Increment local click counter
            const newClickCount = clickCount + 1;
            setClickCount(newClickCount);

            // Flip buttons every 100 clicks
            if (newClickCount % 100 === 0) {
                setFlipped((prevFlipped) => !prevFlipped);
            }

            // Show response every 10 clicks
            if (newClickCount % 10 === 0) {
                const responseIndex = Math.floor(newClickCount / 10) - 1;

                if (RESPONSES[responseIndex]) {
                    addSnackbar(RESPONSES[responseIndex], SnackbarColor.Info);
                } else {
                    addSnackbar(
                        "Well, I'm out of responses for you. I hope you stop clicking at some point.",
                        SnackbarColor.Info
                    );
                }
            }
        } catch (error) {
            console.error("Error handling feedback:", error);
        }
    };
    return (
        <Box
            sx={{
                height: "100dvh",
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
            <Typography variant="h2" sx={{mb: 4}}>
                Welcome to Tyler's Corner of the Web!
            </Typography>
            <Typography variant="h5" sx={{mb: 6, maxWidth: 600}}>
                A place for my thoughts, photos, and projects, curated for anyone curious enough to visit. Thanks for
                stopping by—I'd love to hear your feedback below!
            </Typography>

            <Box sx={{display: "flex", gap: 3}}>
                {flipped ? (
                    <>
                        <Box sx={{textAlign: "center"}}>
                            <IconButton
                                color="primary"
                                onClick={() => handleFeedback("thumbs_down")}
                                sx={{
                                    "&:hover": {color: "error.main"},
                                }}
                            >
                                <ThumbDownAltIcon/>
                            </IconButton>
                            <Typography variant="body1">{feedbackCounts.thumbs_down}</Typography>
                        </Box>
                        <Box sx={{textAlign: "center"}}>
                            <IconButton
                                color="primary"
                                onClick={() => handleFeedback("thumbs_up")}
                                sx={{
                                    "&:hover": {color: "success.main"},
                                }}
                            >
                                <ThumbUpAltIcon/>
                            </IconButton>
                            <Typography variant="body1">{feedbackCounts.thumbs_up}</Typography>
                        </Box>
                    </>
                ) : (
                    <>
                        <Box sx={{textAlign: "center"}}>
                            <IconButton
                                color="primary"
                                onClick={() => handleFeedback("thumbs_up")}
                                sx={{
                                    "&:hover": {color: "success.main"},
                                }}
                            >
                                <ThumbUpAltIcon/>
                            </IconButton>
                            <Typography variant="body1">{feedbackCounts.thumbs_up}</Typography>
                        </Box>
                        <Box sx={{textAlign: "center"}}>
                            <IconButton
                                color="primary"
                                onClick={() => handleFeedback("thumbs_down")}
                                sx={{
                                    "&:hover": {color: "error.main"},
                                }}
                            >
                                <ThumbDownAltIcon/>
                            </IconButton>
                            <Typography variant="body1">{feedbackCounts.thumbs_down}</Typography>
                        </Box>
                    </>
                )}
            </Box>
        </Box>
    );
};
