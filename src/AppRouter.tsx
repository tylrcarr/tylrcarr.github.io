import React, { FC } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ROUTES } from "./constants/routes";
import { Box, Container } from "@mui/material";
import { motion } from "framer-motion";

export const AppRouter: FC = () => {
    const location = useLocation(); // React Router's location object

    const pageVariants = {
        initial: {
            opacity: 0,
            y: 20, // Slide in from slightly below
            scale: 0.98,
        },
        animate: {
            opacity: 1,
            y: 0,
            scale: 1,
        },
        exit: {
            opacity: 0,
            y: -20, // Slide out slightly above
            scale: 0.98,
        },
    };

    const pageTransition = {
        duration: 0.5, // Smooth and moderate speed
        ease: "easeInOut", // Polished easing
    };

    return (
        <Box style={{ height: "100%", overflow: "hidden" }}>
            <Container style={{ height: "100%" }}>
                <Routes location={location} key={location.pathname}>
                    {ROUTES.map((route) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={
                                <motion.div
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    variants={pageVariants}
                                    transition={pageTransition}
                                    style={{
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    {route.element}
                                </motion.div>
                            }
                        />
                    ))}
                </Routes>
            </Container>
        </Box>
    );
};
