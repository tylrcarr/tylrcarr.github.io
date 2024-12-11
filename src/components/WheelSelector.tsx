import React, { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { styled } from "@mui/system";
import { calculatePath } from "../utils/math"; // Utility function for SVG paths

// Constants specific to this component
const INNER_RADIUS = 50; // Inner circle radius
const ICON_SIZE = 24; // Size of the icons

const WheelContainer = styled(Box)({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
});

const Section = styled("path")(({ theme }: { theme: any }) => ({
    fill: theme.palette.primary.main,
    transition: "fill 0.2s ease-in-out",
    cursor: "pointer",
    "&:hover": {
        fill: theme.palette.primary.light,
    },
}));

const CenterCircle = styled("circle")(({ theme }: { theme: any }) => ({
    fill: theme.palette.secondary.main,
    transition: "fill 0.2s ease-in-out",
    cursor: "pointer",
    "&:hover": {
        fill: theme.palette.secondary.light,
    },
}));

const XText = styled("text")(({ theme }: { theme: any }) => ({
    fill: theme.palette.text.primary,
    fontSize: "18px",
    fontWeight: "bold",
    textAnchor: "middle",
    alignmentBaseline: "middle",
    pointerEvents: "none", // Prevent text from intercepting events
}));

type WheelItem = {
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
};

type WheelSelectorProps = {
    items: WheelItem[];
    onClose: () => void;
};

export const WheelSelector: React.FC<WheelSelectorProps> = ({ items, onClose }) => {
    const theme = useTheme();
    const [outerRadius, setOuterRadius] = useState(() =>
        Math.min(window.innerWidth, window.innerHeight) / 2 - 50
    );

    useEffect(() => {
        const handleResize = () => {
            setOuterRadius(Math.min(window.innerWidth, window.innerHeight) / 2 - 50);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const ringMidpointRadius = (outerRadius + INNER_RADIUS) / 2;
    const center = outerRadius;
    const anglePerSegment = 360 / items.length;

    return (
        <WheelContainer sx={{ width: outerRadius * 2, height: outerRadius * 2 }}>
            {/* Visible SVG Layer */}
            <svg width={outerRadius * 2} height={outerRadius * 2}>
                {items.map((item, index) => {
                    const startAngle = index * anglePerSegment - 90;
                    const endAngle = startAngle + anglePerSegment;

                    const angle = (startAngle + endAngle) / 2; // Midpoint angle
                    const radians = (angle: number) => (angle * Math.PI) / 180;

                    const iconX = center + ringMidpointRadius * Math.cos(radians(angle));
                    const iconY = center + ringMidpointRadius * Math.sin(radians(angle));

                    return (
                        <g
                            key={index}
                            onClick={item.onClick}
                            style={{ cursor: "pointer" }}
                        >
                            <Section
                                d={calculatePath(startAngle, endAngle, outerRadius, center)}
                            />
                            {/* Render Icon */}
                            <foreignObject
                                x={iconX - ICON_SIZE / 2}
                                y={iconY - ICON_SIZE / 2}
                                width={ICON_SIZE}
                                height={ICON_SIZE}
                            >
                                {item.icon}
                            </foreignObject>
                            <text
                                x={iconX}
                                y={iconY + ICON_SIZE}
                                textAnchor="middle"
                                alignmentBaseline="middle"
                                style={{
                                    fontSize: "14px",
                                    fill: theme.palette.text.primary,
                                    pointerEvents: "none",
                                }}
                            >
                                {item.label}
                            </text>
                        </g>
                    );
                })}
                {/* Center Button */}
                <g
                    onClick={onClose}
                    style={{ cursor: "pointer" }}
                >
                    <CenterCircle cx={center} cy={center} r={INNER_RADIUS} />
                    <XText x={center} y={center}>
                        x
                    </XText>
                </g>
            </svg>
        </WheelContainer>
    );
};
