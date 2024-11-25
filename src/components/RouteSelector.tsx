import {Box, Fab, Modal, styled, Typography} from "@mui/material";
import React, {FC, useEffect, useState} from "react";
import {Close} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import {ROUTES} from "../constants/routes";
import {useRouter} from "../hooks/use-router.hook";

const WheelContainer = styled(Box)(({theme}) => ({
    position: "relative",
    width: "100vw", // Responsive width (60% of the viewport width)
    height: "100vw", // Same for height
    maxWidth: "500px", // Max width to prevent too large on big screens
    maxHeight: "500px", // Max height to prevent too large on big screens
    borderRadius: "50%",
    backgroundColor: "transparent",
    boxShadow: "0",
    margin: "0 auto", // Center the wheel horizontally
}));

type WheelProps = {
    onClose: () => void;
}

const WheelSelector: FC<WheelProps> = ({onClose}) => {
    const [radius, setRadius] = useState<number>(120); // Initial radius of outer segments
    const {setCurrent} = useRouter();

    const anglePerSegment = 360 / ROUTES.length;

    // Adjust radius dynamically based on the window size
    useEffect(() => {
        const updateRadius = () => {
            const wheelSize = 0.6 * window.innerWidth; // 60% of the window width
            setRadius(wheelSize * 0.35); // 35% of the wheel size for the outer segment radius
        };

        // Update radius on mount and when the window is resized
        updateRadius();
        window.addEventListener("resize", updateRadius);

        return () => window.removeEventListener("resize", updateRadius);
    }, []);

    const onFabClick = (routeId: string) => {
        setCurrent(routeId);
        onClose();
    }

    return (
        <WheelContainer>
            {ROUTES.map((route, index) => {
                const angle = index * anglePerSegment;
                const x = radius * Math.cos((angle * Math.PI) / 180);
                const y = radius * Math.sin((angle * Math.PI) / 180);

                return (
                    <Fab
                        key={index}
                        variant="extended"
                        color="inherit"
                        onClick={() => onFabClick(route.id)}
                        sx={{
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            transform: `translate(-50%, -50%) translateX(${x}px) translateY(${y}px)`,
                            backgroundColor: "transparent",
                        }}
                    >
                        {route.icon}
                        <Typography sx={{ml: 1}}>{route.label}</Typography>
                    </Fab>
                );
            })}

            {/* Center Circle as Regular Fab (Fixed Size) */}
            <Fab
                color="inherit"
                sx={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "transparent",
                }}
                onClick={onClose}
            >
                <Close />
            </Fab>
        </WheelContainer>
    );
};

type Props = {}

export const RouteSelector: FC<Props> = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Fab
                color="inherit"
                style={{position: "absolute", top: 0, left: 0, backgroundColor: "transparent"}}
                onClick={() => setOpen(true)}
            >
                <MenuIcon />
            </Fab>
            <Modal open={open} onClose={() => setOpen(false)}>
                <div style={{position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)"}}>
                    <WheelSelector onClose={() => setOpen(false)} />
                </div>
            </Modal>
        </>
    );
}
