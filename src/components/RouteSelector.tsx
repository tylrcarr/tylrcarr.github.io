import React, { useState } from "react";
import { Modal, Backdrop, Fab } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { WheelSelector } from "./WheelSelector";
import { ROUTES } from "../constants/routes";
import { useRouter } from "../hooks/use-router.hook";

export const RouteSelector: React.FC = () => {
    const [open, setOpen] = useState(false);
    const { setCurrent } = useRouter();

    const items = ROUTES.map((route) => ({
        label: route.label,
        icon: route.icon,
        onClick: () => {
            setCurrent(route.id);
            setOpen(false);
        },
    }));

    return (
        <>
            <Fab
                color="primary"
                sx={{ position: "absolute", top: 16, left: 16 }}
                onClick={() => setOpen(true)}
            >
                <MenuIcon />
            </Fab>

            <Modal
                open={open}
                onClose={() => setOpen(false)} // Escape key and background click
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        onClick: () => setOpen(false),
                        sx: { backgroundColor: "rgba(0, 0, 0, 0.8)" },
                    },
                }}
            >
                <WheelSelector items={items} onClose={() => setOpen(false)} />
            </Modal>
        </>
    );
};
