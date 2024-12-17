import React from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import {useTheme} from "@mui/material/styles";
import {Box, Typography} from "@mui/material";

type PhotoModalProps = {
    onClose: () => void;
    photos: string[];
    text?: string; // Optional text prop for picture text
    selectedIndex?: number; // Optional index to start from
};

export const PhotoModal: React.FC<PhotoModalProps> = ({
                                                          onClose,
                                                          photos,
                                                          text,
                                                          selectedIndex = 0,
                                                      }) => {
    const theme = useTheme();

    return (
        <Lightbox
            open={true}
            close={onClose}
            slides={photos.map((src) => ({src}))}
            index={selectedIndex}
            animation={{
                fade: 300, // Smooth fade-in/out duration in milliseconds
                swipe: 300, // Smooth swipe animation duration
            }}
            plugins={[Zoom]} // Enable Zoom plugin
            zoom={{
                maxZoomPixelRatio: 3, // Max zoom level
                scrollToZoom: true, // Allow zooming with scroll (desktop)
            }}
            styles={{
                container: {backgroundColor: theme.palette.background.default}, // Match MUI theme background
            }}
            render={{
                slideFooter: text
                    ? () => (
                        <Box
                            sx={{
                                position: "absolute",
                                bottom: 0,
                                width: "100%",
                                background: "rgba(0, 0, 0, 0.5)",
                                color: theme.palette.text.primary,
                                textAlign: "center",
                                p: 1,
                            }}
                        >
                            <Typography variant="subtitle1">{text}</Typography>
                        </Box>
                    )
                    : undefined,
            }}
        />
    );
};
