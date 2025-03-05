import React from "react";
import {Box, Card, CardActionArea, CardContent, Typography, useTheme} from "@mui/material";
import {HelpOutline} from "@mui/icons-material";

export const ToolsPage: React.FC = () => {
    const theme = useTheme(); // Access your MUI theme

    return (
        <Box
            sx={{
                width: "100%",
                height: "100dvh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: theme.palette.background.default, // Use theme's background
                padding: theme.spacing(2),
            }}
        >
            {/* Coin Flipper Tool Card */}
            <Card
                sx={{
                    width: 200,
                    height: 250,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: theme.shadows[3], // Use theme's shadow
                    borderRadius: theme.shape.borderRadius, // Use theme's border radius
                    transition: "transform 0.2s",
                    "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: theme.shadows[6], // Stronger shadow on hover
                    },
                }}
            >
                <CardActionArea
                    onClick={() => (window.location.href = "/coin-flipper")}
                    sx={{
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <CardContent
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: theme.spacing(1), // Use theme's spacing
                        }}
                    >
                        <HelpOutline
                            sx={{
                                fontSize: 48,
                                color: theme.palette.text.secondary, // Use theme's text color
                            }}
                        />
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: theme.typography.fontWeightBold, // Use theme's bold font weight
                                color: theme.palette.text.primary, // Use theme's primary text color
                                textAlign: "center",
                            }}
                        >
                            Coin Flipper
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>
    );
};
