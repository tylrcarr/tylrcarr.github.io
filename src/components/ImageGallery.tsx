import React from "react";
import {Box, ImageList, ImageListItem, Typography, useTheme} from "@mui/material";

type ImageGalleryProps = {
    ledger: Record<string, { files: string[]; text: string }>;
    onImageClick: (date: string) => void;
};

export const ImageGallery: React.FC<ImageGalleryProps> = ({ledger, onImageClick}) => {
    const theme = useTheme();

    const sortedEntries = Object
        .entries(ledger)
        .sort(([dateA], [dateB]) => dateB.localeCompare(dateA));

    return (
        <ImageList cols={3} gap={1}>
            {sortedEntries.map(([date, entry]) => (
                <ImageListItem
                    key={date}
                    onClick={() => onImageClick(date)}
                    style={{
                        cursor: "pointer",
                        position: "relative",
                    }}
                >
                    {/* Dynamically Constructed Image Path */}
                    <img
                        src={`/public-photos/${date}/thumbnail.png`}
                        alt={entry.text}
                        loading="lazy"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />

                    {/* Overlay with Date and Photo Count */}
                    <Box
                        sx={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            width: "100%",
                            bgcolor: theme.palette.background.default,
                            color: theme.palette.text.primary,
                            opacity: 0.85,
                            p: theme.spacing(0.5),
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        {/* Date */}
                        <Typography
                            variant="caption"
                            sx={{
                                color: theme.palette.primary.main,
                                fontWeight: theme.typography.fontWeightBold,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {date}
                        </Typography>

                        {/* Photo Count */}
                        <Typography
                            variant="caption"
                            sx={{
                                color: theme.palette.text.secondary,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {entry.files.length} photo{entry.files.length > 1 ? "s" : ""}
                        </Typography>
                    </Box>
                </ImageListItem>
            ))}
        </ImageList>
    );
};