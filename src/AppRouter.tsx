import React, { FC, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ROUTES } from "./constants/routes"; // Route definitions

export const AppRouter: FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [animationLock, setAnimationLock] = useState(false); // Prevent overlapping animations
    const directionRef = React.useRef(0); // Track swipe direction: -2 (up), 2 (down), 1 (left), -1 (right)

    // Framer Motion variants for page transitions
    const pageVariants = {
        initial: (direction: number) => ({
            x: direction === 1 || direction === -1 ? (direction === 1 ? "100%" : "-100%") : 0, // Horizontal swipes
            y: direction === 2 || direction === -2 ? (direction === 2 ? "-100%" : "100%") : 0, // Vertical swipes (matching the swipe's direction)
            opacity: 0, // Fade in
        }),
        animate: {
            x: 0,
            y: 0,
            opacity: 1, // Fully visible on entry
        },
        exit: (direction: number) => ({
            x: direction === 1 || direction === -1 ? (direction === 1 ? "-100%" : "100%") : 0,
            y: direction === 2 || direction === -2 ? (direction === 2 ? "100%" : "-100%") : 0, // Vertical exit (same as entry direction)
            opacity: 0, // Fade out
        }),
    };

    const pageTransition = {
        duration: 0.5, // Customize transition duration
        ease: "easeInOut",
    };

    // Handle swipe gestures
    const handleSwipe = (event: any, info: { offset: { x: number; y: number } }) => {
        if (animationLock) return; // Prevent overlapping animations
        const { x, y } = info.offset;

        // **Swipe Down**: Current and next page both swipe down
        if (y > 100 && location.pathname === "/") {
            setAnimationLock(true);
            directionRef.current = 2; // Swipe downward
            navigate("/me"); // Move to "/me"
            setTimeout(() => setAnimationLock(false), 500);
            return;
        }

        // **Swipe Up**: Current and next page both swipe up
        if (y < -100 && location.pathname === "/me") {
            setAnimationLock(true);
            directionRef.current = -2; // Swipe upward
            navigate("/"); // Move back to "/"
            setTimeout(() => setAnimationLock(false), 500);
            return;
        }

        // **Swipe Left**: Standard Horizontal Forward
        if (x < -100) {
            setAnimationLock(true);
            directionRef.current = 1; // Swipe left
            navigate(1); // Navigate forward in history
            setTimeout(() => setAnimationLock(false), 500);
        }

        // **Swipe Right**: Standard Horizontal Backward
        if (x > 100) {
            setAnimationLock(true);
            directionRef.current = -1; // Swipe right
            navigate(-1); // Navigate back in history
            setTimeout(() => setAnimationLock(false), 500);
        }
    };

    return (
        <motion.div
            key={location.pathname} // New key for every route change
            custom={directionRef.current} // Pass swipe direction dynamically
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants} // Animation variants
            transition={pageTransition} // Swipe animation duration/speed
            drag={true} // Enable swipe gestures
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            onDragEnd={handleSwipe} // Detect direction of swipe at swipe end
            style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                overflow: "hidden", // Prevent content overflow
            }}
        >
            <Routes location={location} key={location.key}>
                {ROUTES.map((route) => (
                    <Route key={route.path} path={route.path} element={route.element} />
                ))}
            </Routes>
        </motion.div>
    );
};