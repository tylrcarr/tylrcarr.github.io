import React, {useState} from "react";
import {Backdrop, Box, IconButton, Modal} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {WheelSelector} from "./WheelSelector";
import {ROUTES} from "../constants/routes";
import {useNavigate} from "react-router-dom";

export const MenuButton: React.FC<{ onClick: () => void }> = ({onClick}) => {
    return (
        <Box
            sx={{
                position: "absolute",
                bottom: 16,
                left: 16,
                zIndex: 10,
            }}
        >
            <IconButton
                onClick={onClick}
                sx={{
                    color: "secondary.main", // Sets the icon color to secondary
                    transition: "color 0.3s ease", // Smooth color transition
                    "&:hover": {
                        color: "secondary.light", // Secondary hover effect
                    },
                }}
            >
                <MenuIcon fontSize="large" />
            </IconButton>
        </Box>
    );
};


export const RouteSelector: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const navigate = useNavigate();

    const items = ROUTES
        .filter(route => !route.hideFromMainNav)
        .map((route) => ({
            label: route.label,
            icon: route.icon,
            onClick: () => {
                setIsClosing(true);
                navigate(route.path);
            },
        }));

    const handleOpen = () => {
        setOpen(true);
        setIsClosing(false);
    };

    const handleExternalClose = () => {
        if (!isClosing) {
            setIsClosing(true);
        }
    };

    const handleAnimationEnd = () => {
        setOpen(false);
    };

    return (
        <>
            <MenuButton onClick={handleOpen} />

            <Modal
                open={open}
                onClose={handleExternalClose}
                slots={{backdrop: Backdrop}}
                slotProps={{
                    backdrop: {
                        onClick: handleExternalClose,
                        sx: {backgroundColor: "rgba(0, 0, 0, 0.8)"},
                    },
                }}
            >
                <WheelSelector
                    items={items}
                    isClosing={isClosing}
                    onRequestClose={() => setIsClosing(true)}
                    onAnimationEnd={handleAnimationEnd}
                />
            </Modal>
        </>
    );
};
