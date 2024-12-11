import React, { useState } from "react";
import {
    Box,
    Dialog,
    IconButton,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

type PhotoModalProps = {
    onClose: () => void;
    photos: string[];
    text: string;
};

export const PhotoModal: React.FC<PhotoModalProps> = ({ onClose, photos, text }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const theme = useTheme();

    const goLeft = () =>
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
    const goRight = () =>
        setCurrentIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));

    const handleViewFullPicture = () => {
        window.open(photos[currentIndex], "_blank");
    };

    return (
        <Dialog fullScreen open={!!photos} onClose={onClose}>
            <Box
                sx={{
                    position: "relative",
                    height: "100%",
                    bgcolor: theme.palette.background.default,
                }}
            >
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        top: theme.spacing(2),
                        right: theme.spacing(2),
                        color: theme.palette.text.primary,
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <Typography
                    variant="h6"
                    sx={{
                        color: theme.palette.text.primary,
                        textAlign: "center",
                        mt: theme.spacing(4),
                    }}
                >
                    {text}
                </Typography>

                {/* Responsive Image Container */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "80%",
                        mt: theme.spacing(4),
                        px: theme.spacing(2),
                    }}
                >
                    <Box
                        component="img"
                        src={photos[currentIndex]}
                        alt={`Photo ${currentIndex + 1}`}
                        sx={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain",
                            borderRadius: theme.shape.borderRadius,
                        }}
                    />
                </Box>

                {/* Navigation and Additional Controls */}
                <Box
                    sx={{
                        position: "absolute",
                        bottom: theme.spacing(2),
                        width: "100%",
                        textAlign: "center",
                    }}
                >
                    {/* Left Navigation */}
                    <IconButton
                        onClick={goLeft}
                        sx={{
                            color: theme.palette.primary.main,
                            "&:hover": {
                                color: theme.palette.primary.dark,
                            },
                        }}
                    >
                        <ArrowBackIosIcon />
                    </IconButton>

                    {/* View Full Picture Button */}
                    <Tooltip title="View Full Picture">
                        <IconButton
                            onClick={handleViewFullPicture}
                            sx={{
                                color: theme.palette.secondary.main,
                                mx: theme.spacing(2),
                                "&:hover": {
                                    color: theme.palette.secondary.dark,
                                },
                            }}
                        >
                            <OpenInNewIcon />
                        </IconButton>
                    </Tooltip>

                    {/* Right Navigation */}
                    <IconButton
                        onClick={goRight}
                        sx={{
                            color: theme.palette.primary.main,
                            "&:hover": {
                                color: theme.palette.primary.dark,
                            },
                        }}
                    >
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Box>
            </Box>
        </Dialog>
    );
};
