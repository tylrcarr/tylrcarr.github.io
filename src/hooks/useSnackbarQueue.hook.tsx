import React, { createContext, useContext, useState, useCallback } from "react";
import {Box, Typography, IconButton, useTheme, Theme} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export enum SnackbarColor {
    Success = "success",
    Error = "error",
    Info = "info",
}

type Snackbar = {
    id: number;
    message: string;
    color: string; // Resolved MUI color
};

type SnackbarContextType = {
    addSnackbar: (message: string, color: SnackbarColor) => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const useSnackbarQueue = (): SnackbarContextType => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error("useSnackbarQueue must be used within a SnackbarProvider");
    }
    return context;
};

const getColorFromEnum = (color: SnackbarColor, theme: Theme) => {
    switch (color) {
        case SnackbarColor.Success:
            return theme.palette.success.main;
        case SnackbarColor.Error:
            return theme.palette.error.main;
        case SnackbarColor.Info:
            return theme.palette.info.main;
        default:
            return theme.palette.primary.main;
    }
};

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const theme = useTheme();
    const [snackbars, setSnackbars] = useState<Snackbar[]>([]);



    const addSnackbar = useCallback((message: string, color: SnackbarColor) => {
        const id = Date.now();
        const bgColor = getColorFromEnum(color, theme);
        setSnackbars((prev) => [...prev, { id, message, color: bgColor }]);

        // Auto-dismiss after 3 seconds
        setTimeout(() => {
            setSnackbars((prev) => prev.filter((snackbar) => snackbar.id !== id));
        }, 3000);
    }, [theme]);

    const removeSnackbar = useCallback((id: number) => {
        setSnackbars((prev) => prev.filter((snackbar) => snackbar.id !== id));
    }, []);

    return (
        <SnackbarContext.Provider value={{ addSnackbar }}>
            {children}
            {/* Snackbars Container */}
            <Box
                sx={{
                    position: "fixed",
                    bottom: 16,
                    right: 16,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    zIndex: 1300,
                }}
            >
                {snackbars.map((snackbar) => (
                    <Box
                        key={snackbar.id}
                        sx={{
                            bgcolor: snackbar.color,
                            color: theme.palette.getContrastText(snackbar.color),
                            p: 2,
                            borderRadius: 1,
                            boxShadow: theme.shadows[3],
                            maxWidth: 300,
                            width: 300,
                            overflowWrap: "break-word",
                            position: "relative",
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                fontFamily: theme.typography.fontFamily,
                            }}
                        >
                            {snackbar.message}
                        </Typography>
                        <IconButton
                            onClick={() => removeSnackbar(snackbar.id)}
                            size="small"
                            sx={{
                                position: "absolute",
                                top: 4,
                                right: 4,
                                color: theme.palette.getContrastText(snackbar.color),
                            }}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </Box>
                ))}
            </Box>
        </SnackbarContext.Provider>
    );
};
