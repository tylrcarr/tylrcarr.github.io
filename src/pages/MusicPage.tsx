import React, {FC, useState} from "react";
import {Box, CircularProgress, Container} from "@mui/material";
import {styled, Theme} from "@mui/material/styles";
import {AnimatePresence, motion} from "framer-motion";

const StyledContainer = styled(Container)(({theme}: { theme: Theme }) => ({
    display: "flex",
    maxWidth: "100vw",
    flexDirection: "column",
    height: "90dvh", // Full viewport height
    padding: theme.spacing(2),
    boxSizing: "border-box",
    margin: 0, // Ensure no extra space outside the container
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "4dvh",
    marginBottom: 0,
    overflow: "hidden", // Prevent scroll bars
    backgroundColor: theme.palette.background.default, // Use theme's background
}));

const IframeWrapper = styled(Box)(() => ({
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    height: "100%",
    width: "100%",
}));

const ResponsiveIframe = styled(motion.iframe)(() => ({
    borderRadius: "12px",
    width: "100%",
    height: "100%",
    maxWidth: "800px", // Matches loader's max width
    aspectRatio: "16 / 9", // Maintains aspect ratio
    border: "none",
}));

export const MusicPage: FC = () => {
    const [isLoaded, setIsLoaded] = useState(false); // Track iframe content load state

    const loaderVariants = {
        initial: {opacity: 1},
        exit: {
            opacity: 0,
            transition: {duration: 0.3, ease: "easeInOut"},
        },
    };

    const iframeVariants = {
        hidden: {
            opacity: 0,
            y: 20, // Start slightly below
            scale: 0.95,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeInOut",
            },
        },
    };

    return (
        <StyledContainer maxWidth="lg">
            <IframeWrapper>
                {/* AnimatePresence ensures proper exit animations */}
                <AnimatePresence>
                    {!isLoaded && (
                        <motion.div
                            variants={loaderVariants}
                            initial="initial"
                            animate="initial"
                            exit="exit" // Use exit animation when removed
                            style={{
                                position: "absolute",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                                height: "100%",
                            }}
                        >
                            <CircularProgress color="primary"/>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Animated Iframe */}
                <ResponsiveIframe
                    src="https://open.spotify.com/embed/playlist/37i9dQZF1EppESoXxEQuhU?utm_source=generator&theme=0"
                    onLoad={() => setIsLoaded(true)} // Trigger loader animation out
                    initial="hidden"
                    animate={isLoaded ? "visible" : "hidden"} // Animate based on iframe content load
                    variants={iframeVariants}
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    allowFullScreen
                    title="Spotify Playlist"
                />
            </IframeWrapper>
        </StyledContainer>
    );
};
