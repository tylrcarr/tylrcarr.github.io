import React, {FC, useState} from "react";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import {ROUTES} from "./constants/routes"; // Route definitions

export const AppRouter: FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [animationLock, setAnimationLock] = useState(false); // Prevent overlapping animations
    const directionRef = React.useRef(0); // Track swipe direction: 1 (left), -1 (right)

    // Framer Motion variants for page transitions (horizontal only)
    const pageVariants = {
        initial: (direction: number) => ({
            x: direction === 1 ? "100%" : direction === -1 ? "-100%" : 0, // Horizontal swipe
            opacity: 0, // Fade in
        }),
        animate: {
            x: 0,
            opacity: 1, // Fully visible on entry
        },
        exit: (direction: number) => ({
            x: direction === 1 ? "-100%" : direction === -1 ? "100%" : 0, // Horizontal exit
            opacity: 0, // Fade out
        }),
    };

    const pageTransition = {
        duration: 0.5, // Customize transition duration
        ease: "easeInOut",
    };

    // Handle swipe gestures (horizontal only)
    const handleSwipe = (event: any, info: { offset: { x: number } }) => {
        if (animationLock) return; // Prevent overlapping animations
        const {x} = info.offset;

        // Disable swipe for Sandbox route
        if (location.pathname === "/sandbox") return;

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
            drag={location.pathname === "/sandbox" ? false : "x"} // Disable drag for Sandbox
            dragConstraints={{left: 0, right: 0}} // Horizontal drag only
            onDragEnd={handleSwipe} // Detect horizontal swipe direction
            style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                overflow: "hidden", // Prevent content overflow
            }}
        >
            <Routes location={location} key={location.key}>
                {ROUTES.map((route) => (
                    <Route key={route.path} path={route.path} element={route.element}/>
                ))}
            </Routes>
        </motion.div>
    );
};
