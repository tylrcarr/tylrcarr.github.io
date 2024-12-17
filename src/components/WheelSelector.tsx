import React, {useEffect, useState} from "react";
import {Box} from "@mui/material";
import {styled} from "@mui/system";
import {calculatePath} from "../utils/math";

// Halved times
const INNER_RADIUS = 50;
const ICON_SIZE = 24;
const CIRCLE_ANIMATION_DURATION = 250; // 0.25s for grow/shrink
const TEXT_ICON_FADE_DURATION = 150; // 0.15s for fade in/out

// Timings:
// Open: Circles (0.25s) -> Text/Icons fade in after 0.25s delay, taking 0.15s total ~0.4s total
// Close: Text/Icons fade out (0.15s), then Circles (0.25s) -> 0.4s total
const TOTAL_CLOSE_TIME = TEXT_ICON_FADE_DURATION + CIRCLE_ANIMATION_DURATION; // 150ms + 250ms = 400ms total

const WheelContainer = styled(Box)({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
});

const Section = styled("path")<{ isClosing: boolean }>(({theme, isClosing}) => ({
    fill: theme.palette.primary.main,
    transformOrigin: "50% 50%",
    animation: `${isClosing ? "shrinkSections" : "growSections"} ${CIRCLE_ANIMATION_DURATION}ms ease-out forwards`,
    animationDelay: isClosing ? `${TEXT_ICON_FADE_DURATION}ms` : "0s", // shrink after text fade out (0.15s)
    "@keyframes growSections": {
        "0%": {transform: "scale(0)"},
        "100%": {transform: "scale(1)"},
    },
    "@keyframes shrinkSections": {
        "0%": {transform: "scale(1)"},
        "100%": {transform: "scale(0)"},
    },
    transition: "fill 0.2s ease-in-out",
    cursor: "pointer",
    "&:hover": {
        fill: theme.palette.primary.light,
    },
}));

const SolidBackgroundCircle = styled("circle")<{ isClosing: boolean }>(({theme, isClosing}) => ({
    fill: theme.palette.primary.main,
    transformOrigin: "50% 50%",
    animation: `${isClosing ? "shrinkCircle" : "growCircle"} ${CIRCLE_ANIMATION_DURATION}ms ease-out forwards`,
    animationDelay: isClosing ? `${TEXT_ICON_FADE_DURATION}ms` : "0s",
    "@keyframes growCircle": {
        "0%": {transform: "scale(0)"},
        "100%": {transform: "scale(1)"},
    },
    "@keyframes shrinkCircle": {
        "0%": {transform: "scale(1)"},
        "100%": {transform: "scale(0)"},
    },
}));

const CenterCircle = styled("circle")<{ isClosing: boolean }>(({theme, isClosing}) => ({
    fill: theme.palette.secondary.main,
    cursor: "pointer",
    transformOrigin: "50% 50%",
    animation: `${isClosing ? "shrinkCenterCircle" : "growCenterCircle"} ${CIRCLE_ANIMATION_DURATION}ms ease-out forwards`,
    animationDelay: isClosing ? `${TEXT_ICON_FADE_DURATION}ms` : "0s",
    "@keyframes growCenterCircle": {
        "0%": {transform: "scale(0)"},
        "100%": {transform: "scale(1)"},
    },
    "@keyframes shrinkCenterCircle": {
        "0%": {transform: "scale(1)"},
        "100%": {transform: "scale(0)"},
    },
    transition: "fill 0.2s ease-in-out",
    "&:hover": {
        fill: theme.palette.secondary.light,
    },
}));

const XText = styled("text")<{ isClosing: boolean }>(({theme, isClosing}) => ({
    fill: theme.palette.text.primary,
    fontSize: "18px",
    fontWeight: "bold",
    textAnchor: "middle",
    alignmentBaseline: "middle",
    pointerEvents: "none",
    opacity: 0,
    animation: isClosing
        ? `fadeOutText ${TEXT_ICON_FADE_DURATION}ms ease-out forwards`
        : `fadeInText ${TEXT_ICON_FADE_DURATION}ms ease-out forwards`,
    animationDelay: isClosing ? "0s" : `${CIRCLE_ANIMATION_DURATION}ms`, // fade in after circles grown (0.25s)
    "@keyframes fadeInText": {
        "0%": {opacity: 0},
        "100%": {opacity: 1},
    },
    "@keyframes fadeOutText": {
        "0%": {opacity: 1},
        "100%": {opacity: 0},
    },
}));

const LabelText = styled("text")<{ isClosing: boolean }>(({theme, isClosing}) => ({
    fill: theme.palette.text.primary,
    fontSize: "14px",
    fontWeight: "normal",
    textAnchor: "middle",
    alignmentBaseline: "middle",
    pointerEvents: "none",
    opacity: 0,
    animation: isClosing
        ? `fadeOutText ${TEXT_ICON_FADE_DURATION}ms ease-out forwards`
        : `fadeInText ${TEXT_ICON_FADE_DURATION}ms ease-out forwards`,
    animationDelay: isClosing ? "0s" : `${CIRCLE_ANIMATION_DURATION}ms`,
    "@keyframes fadeInText": {
        "0%": {opacity: 0},
        "100%": {opacity: 1},
    },
    "@keyframes fadeOutText": {
        "0%": {opacity: 1},
        "100%": {opacity: 0},
    },
}));

const IconWrapper = styled("foreignObject")<{ isClosing: boolean }>(({isClosing}) => ({
    pointerEvents: "none",
    opacity: 0,
    animation: isClosing
        ? `fadeOutIcons ${TEXT_ICON_FADE_DURATION}ms ease-out forwards`
        : `fadeInIcons ${TEXT_ICON_FADE_DURATION}ms ease-out forwards`,
    animationDelay: isClosing ? "0s" : `${CIRCLE_ANIMATION_DURATION}ms`,
    "@keyframes fadeInIcons": {
        "0%": {opacity: 0},
        "100%": {opacity: 1},
    },
    "@keyframes fadeOutIcons": {
        "0%": {opacity: 1},
        "100%": {opacity: 0},
    },
}));

type WheelItem = {
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
};

type WheelSelectorProps = {
    items: WheelItem[];
    isClosing: boolean;
    onRequestClose: () => void;
    onAnimationEnd: () => void;
};

export const WheelSelector: React.FC<WheelSelectorProps> = ({
                                                                items,
                                                                isClosing,
                                                                onRequestClose,
                                                                onAnimationEnd,
                                                            }) => {
    const [outerRadius, setOuterRadius] = useState(() =>
        Math.min(window.innerWidth, window.innerHeight) / 2 - INNER_RADIUS
    );

    useEffect(() => {
        const handleResize = () => {
            setOuterRadius(Math.min(window.innerWidth, window.innerHeight) / 2 - INNER_RADIUS);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Adjust onAnimationEnd timing for faster animation
    useEffect(() => {
        if (isClosing) {
            const timer = setTimeout(onAnimationEnd, TOTAL_CLOSE_TIME);
            return () => clearTimeout(timer);
        }
    }, [isClosing, onAnimationEnd]);

    const ringMidpointRadius = (outerRadius + INNER_RADIUS) / 2;
    const center = outerRadius;
    const anglePerSegment = 360 / items.length;

    return (
        <WheelContainer sx={{width: outerRadius * 2, height: outerRadius * 2}}>
            <svg width={outerRadius * 2} height={outerRadius * 2}>
                <SolidBackgroundCircle cx={center} cy={center} r={outerRadius} isClosing={isClosing}/>
                {items.map((item, index) => {
                    const startAngle = index * anglePerSegment - 90;
                    const endAngle = startAngle + anglePerSegment;
                    const angle = (startAngle + endAngle) / 2;
                    const radians = (angle: number) => (angle * Math.PI) / 180;

                    const iconX = center + ringMidpointRadius * Math.cos(radians(angle));
                    const iconY = center + ringMidpointRadius * Math.sin(radians(angle));

                    return (
                        <g key={index} onClick={item.onClick} style={{cursor: "pointer"}}>
                            <Section
                                d={calculatePath(startAngle, endAngle, outerRadius, center)}
                                isClosing={isClosing}
                            />
                            <IconWrapper
                                x={iconX - ICON_SIZE / 2}
                                y={iconY - ICON_SIZE / 2}
                                width={ICON_SIZE}
                                height={ICON_SIZE}
                                isClosing={isClosing}
                            >
                                {item.icon}
                            </IconWrapper>
                            <LabelText x={iconX} y={iconY + ICON_SIZE} isClosing={isClosing}>
                                {item.label}
                            </LabelText>
                        </g>
                    );
                })}
                <g onClick={onRequestClose} style={{cursor: "pointer"}}>
                    <CenterCircle cx={center} cy={center} r={INNER_RADIUS} isClosing={isClosing}/>
                    <XText x={center} y={center} isClosing={isClosing}>
                        x
                    </XText>
                </g>
            </svg>
        </WheelContainer>
    );
};
