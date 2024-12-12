import React, { useEffect, useState } from "react";
import {
    Box,
    CircularProgress,
    Dialog,
    IconButton,
    Modal,
    Typography,
    useTheme,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import * as exifr from "exifr";
import { LeafletMap } from "./LeafletMap";

import "leaflet/dist/leaflet.css";

type PhotoModalProps = {
    onClose: () => void;
    photos: string[];
    text: string;
};

/** Utility to format EXIF metadata for display */
const formatRelevantExifData = (data: Record<string, any>) => {
    if (!data) return [];
    return [
        { label: "Camera", value: `${data.Make || "Unknown"} ${data.Model || ""}`.trim() },
        {
            label: "Date Taken",
            value: data.DateTimeOriginal
                ? new Date(data.DateTimeOriginal).toLocaleString()
                : "Unknown",
        },
        { label: "Altitude", value: data.GPSAltitude ? `${data.GPSAltitude.toFixed(2)}m` : "Unknown" },
        { label: "ISO Speed", value: data.ISO || "Unknown" },
        { label: "Aperture", value: data.FNumber ? `ƒ/${data.FNumber}` : "Unknown" },
        { label: "Shutter Speed", value: data.ExposureTime ? `${data.ExposureTime}s` : "Unknown" },
        { label: "Focal Length", value: data.FocalLength ? `${data.FocalLength}mm` : "Unknown" },
        { label: "Brightness", value: data.BrightnessValue ? `${data.BrightnessValue.toFixed(2)} EV` : "Unknown" },
        { label: "Exposure Program", value: data.ExposureProgram || "Unknown" },
        {
            label: "Focal Length (35mm)",
            value: data.FocalLengthIn35mmFormat ? `${data.FocalLengthIn35mmFormat}mm` : "Unknown",
        },
    ].filter(({ value }) => value !== "Unknown");
};

export const PhotoModal: React.FC<PhotoModalProps> = ({ onClose, photos, text }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [exifData, setExifData] = useState<Record<string, any> | null>(null);
    const [gpsData, setGpsData] = useState<{ lat: number; lng: number } | null>(null);
    const [infoOpen, setInfoOpen] = useState(false);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const theme = useTheme();

    const goLeft = () => {
        setLoading(true);
        setExifData(null);
        setGpsData(null);
        setImageSrc(null);
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
    };

    const goRight = () => {
        setLoading(true);
        setExifData(null);
        setGpsData(null);
        setImageSrc(null);
        setCurrentIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
    };

    const handleViewFullPicture = () => {
        if (imageSrc) {
            window.open(imageSrc, "_blank");
        }
    };

    const handleImageLoad = async () => {
        setLoading(true);
        try {
            const response = await fetch(photos[currentIndex]);
            const blob = await response.blob();
            const objectUrl = URL.createObjectURL(blob);

            setImageSrc(objectUrl);

            const metadata = await exifr.parse(blob);
            setExifData(metadata || null);

            if (metadata?.GPSLatitude && metadata?.GPSLongitude) {
                const lat =
                    metadata.GPSLatitude[0] +
                    metadata.GPSLatitude[1] / 60 +
                    metadata.GPSLatitude[2] / 3600;
                const lng =
                    metadata.GPSLongitude[0] +
                    metadata.GPSLongitude[1] / 60 +
                    metadata.GPSLongitude[2] / 3600;

                const adjustedLat = metadata.GPSLatitudeRef === "S" ? -lat : lat;
                const adjustedLng = metadata.GPSLongitudeRef === "W" ? -lng : lng;

                setGpsData({ lat: adjustedLat, lng: adjustedLng });
            }
        } catch (error) {
            console.error("Error reading EXIF data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleImageLoad();
    }, [photos, currentIndex]);

    return (
        <Dialog fullScreen open={!!photos} onClose={onClose}>
            <Box sx={{ position: "relative", height: "100%", bgcolor: theme.palette.background.default }}>
                <IconButton
                    onClick={onClose}
                    sx={{ position: "absolute", top: theme.spacing(2), right: theme.spacing(2), color: theme.palette.text.primary }}
                >
                    <CloseIcon />
                </IconButton>

                <Typography variant="h6" sx={{ color: theme.palette.text.primary, textAlign: "center", mt: theme.spacing(4) }}>
                    {text}
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80%", px: theme.spacing(2), position: "relative" }}>
                    {loading && <CircularProgress />}
                    {imageSrc && (
                        <Box
                            component="img"
                            src={imageSrc}
                            alt={`Photo ${currentIndex + 1}`}
                            sx={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                objectFit: "contain",
                                borderRadius: theme.shape.borderRadius,
                                display: loading ? "none" : "block",
                            }}
                        />
                    )}
                </Box>

                {/* Photo Navigation Info */}
                <Box sx={{ textAlign: "center", mt: theme.spacing(2) }}>
                    <Typography variant="subtitle1" color={theme.palette.text.secondary}>
                        Photo {currentIndex + 1} of {photos.length}
                    </Typography>
                </Box>

                <Box sx={{ position: "absolute", bottom: theme.spacing(2), width: "100%", textAlign: "center" }}>
                    <IconButton
                        onClick={goLeft}
                        disabled={photos.length === 1}
                        sx={{
                            color: photos.length === 1 ? theme.palette.action.disabled : theme.palette.primary.main,
                            "&:hover": {
                                color: photos.length === 1 ? theme.palette.action.disabled : theme.palette.primary.dark,
                            },
                        }}
                    >
                        <ArrowBackIosIcon />
                    </IconButton>

                    <IconButton onClick={handleViewFullPicture} sx={{ color: theme.palette.secondary.main, mx: theme.spacing(2), "&:hover": { color: theme.palette.secondary.dark } }}>
                        <OpenInNewIcon />
                    </IconButton>

                    <IconButton
                        onClick={goRight}
                        disabled={photos.length === 1}
                        sx={{
                            color: photos.length === 1 ? theme.palette.action.disabled : theme.palette.primary.main,
                            "&:hover": {
                                color: photos.length === 1 ? theme.palette.action.disabled : theme.palette.primary.dark,
                            },
                        }}
                    >
                        <ArrowForwardIosIcon />
                    </IconButton>

                    <IconButton onClick={() => setInfoOpen(true)} sx={{ position: "absolute", right: theme.spacing(2), bottom: theme.spacing(2), color: theme.palette.info.main, "&:hover": { color: theme.palette.info.dark } }}>
                        <InfoOutlinedIcon />
                    </IconButton>
                </Box>
            </Box>

            <Modal open={infoOpen} onClose={() => setInfoOpen(false)}>
                <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", bgcolor: theme.palette.background.paper, boxShadow: 24, p: theme.spacing(4), borderRadius: theme.shape.borderRadius, width: "80%", maxHeight: "80%", overflow: "auto" }}>
                    <IconButton onClick={() => setInfoOpen(false)} sx={{ position: "absolute", top: theme.spacing(1), right: theme.spacing(1), color: theme.palette.text.primary }}>
                        <CloseIcon />
                    </IconButton>

                    <Typography variant="h6" color={theme.palette.text.primary}>
                        Photo Information
                    </Typography>

                    {exifData && (
                        <Box sx={{ mt: theme.spacing(2) }}>
                            {formatRelevantExifData(exifData).map(({ label, value }) => (
                                <Typography key={label} variant="body2" color={theme.palette.text.secondary}>
                                    <strong>{label}:</strong> {value}
                                </Typography>
                            ))}
                        </Box>
                    )}

                    {gpsData && (
                        <Box sx={{ mt: theme.spacing(2), height: "300px" }}>
                            <LeafletMap lat={gpsData.lat} lng={gpsData.lng} popupText="Photo taken here!" />
                        </Box>
                    )}
                </Box>
            </Modal>
        </Dialog>
    );
};
