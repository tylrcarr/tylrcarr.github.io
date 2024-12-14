// MusicPage.tsx
import React, { FC } from "react";
import { Container, Box, useTheme } from "@mui/material";
import { styled, Theme } from "@mui/material/styles";

// Styled Container to control overall layout
const StyledContainer = styled(Container)(({ theme }: { theme: Theme }) => ({
    display: "flex",
    flexDirection: "column",
    height: "100vh", // Full viewport height
    padding: theme.spacing(2),
    boxSizing: "border-box",
    backgroundColor: theme.palette.background.default, // Use theme's background
}));

// Styled Box to make iframe responsive and take full height
const IframeWrapper = styled(Box)(({ theme }: { theme: Theme }) => ({
    flexGrow: 1, // Allows the iframe to take up remaining space
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}));

// Styled iframe for responsiveness
const ResponsiveIframe = styled("iframe")(({ theme }: { theme: Theme }) => ({
    borderRadius: "12px",
    width: "100%",
    height: "100%",
    maxWidth: "800px", // Limits the width on larger screens
    [theme.breakpoints.down("sm")]: {
        maxWidth: "100%", // Full width on small screens
    },
    border: "none",
    boxShadow: theme.shadows[5], // Use theme's shadow
}));

export const MusicPage: FC = () => {
    const theme = useTheme();

    return (
        <StyledContainer maxWidth="lg">
            <IframeWrapper>
                <ResponsiveIframe
                    src="https://open.spotify.com/embed/playlist/37i9dQZF1FoyQGyinuuvRu?utm_source=generator"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    allowFullScreen
                    title="TySpace Spotify Playlist"
                ></ResponsiveIframe>
            </IframeWrapper>
        </StyledContainer>
    );
};
