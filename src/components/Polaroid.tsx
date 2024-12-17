// Polaroid.tsx
import React, {useRef, useState} from 'react';
import {Box, ClickAwayListener, Tooltip, useMediaQuery, useTheme,} from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {keyframes} from '@mui/system';
import {SvgIconProps} from '@mui/material/SvgIcon';

type PolaroidProps = {
    icon: React.ComponentType<SvgIconProps>;
    label: string;
    color: string;
    position: { top: string; left: string };
    rotation: number;
    onClick?: () => void;
};

const Polaroid: React.FC<PolaroidProps> = ({
                                               icon: Icon,
                                               label,
                                               color,
                                               position,
                                               rotation,
                                               onClick,
                                           }) => {
    const [selected, setSelected] = useState(false);
    const [showSelection, setShowSelection] = useState(false); // For mobile first tap
    const [isHovered, setIsHovered] = useState(false); // For desktop hover
    const polaroidRef = useRef<HTMLDivElement>(null);

    const theme = useTheme();
    // Detect if the device is mobile (screen width <= sm)
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'), {
        noSsr: true,
    });

    // Define keyframes for arrow bounce animation
    const bounce = keyframes`
        0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-10px);
        }
        60% {
            transform: translateY(-5px);
        }
    `;

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation(); // Prevent event bubbling

        if (isMobile) {
            if (!showSelection) {
                // First tap: show selection indicators
                setShowSelection(true);
            } else {
                // Second tap: toggle selection
                setSelected((prevSelected) => {
                    const newSelected = !prevSelected;
                    if (newSelected && onClick) {
                        onClick();
                    }
                    return newSelected;
                });
                setShowSelection(false); // Reset selection indicators
            }
        } else {
            // Desktop: single click toggles selection
            setSelected((prevSelected) => {
                const newSelected = !prevSelected;
                if (newSelected && onClick) {
                    onClick();
                }
                return newSelected;
            });
        }
    };

    const handleClickAway = (event: MouseEvent | TouchEvent) => {
        if (polaroidRef.current && !polaroidRef.current.contains(event.target as Node)) {
            setSelected(false);
            setShowSelection(false); // Reset selection indicators on click away
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
            handleClick(event as any);
        }
    };

    // Handlers for hover state only if the device is not mobile
    const handleMouseEnter = () => {
        if (!isMobile) {
            setIsHovered(true);
        }
    };

    const handleMouseLeave = () => {
        if (!isMobile) {
            setIsHovered(false);
        }
    };

    // Determine if the Polaroid is active (selected, hovered, or showing selection indicators)
    const isActive = selected || showSelection || isHovered;

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Tooltip
                title={label}
                arrow
                open={isActive} // Show tooltip on active states
                disableFocusListener
                disableTouchListener
                disableHoverListener // Manage tooltip visibility manually
            >
                <Box
                    ref={polaroidRef}
                    role="button"
                    tabIndex={0}
                    aria-label={label}
                    sx={{
                        width: '15%',
                        aspectRatio: '3/4',
                        backgroundColor: 'white',
                        border: isActive
                            ? `2px solid ${color}`
                            : '2px solid #ddd', // Apply border on active states
                        borderRadius: 2,
                        boxShadow: isActive
                            ? `0 0 10px ${color}50`
                            : '0 4px 8px rgba(0, 0, 0, 0.2)', // Apply boxShadow on active states
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        position: 'absolute',
                        top: position.top,
                        left: position.left,
                        transform: isActive
                            ? 'rotate(0deg) scale(1.1)' // Straighten and scale up when active
                            : `rotate(${rotation}deg) scale(1)`,
                        transition:
                            'transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease',
                        cursor: 'pointer',
                        '&:hover': !isMobile
                            ? {
                                // Apply hover effects only on desktop
                                transform: 'rotate(0deg) scale(1.1)',
                                boxShadow: `0 8px 16px ${color}70`,
                            }
                            : {},
                        outline: 'none',
                        '&:focus': {
                            boxShadow: `0 0 0 3px ${color}50`,
                        },
                        zIndex: 2,
                    }}
                    onClick={handleClick}
                    onKeyDown={handleKeyDown}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {/* Magnet */}
                    <Box
                        sx={{
                            width: '12%',
                            aspectRatio: '1',
                            backgroundColor: color,
                            borderRadius: '50%',
                            position: 'absolute',
                            top: '-5%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                        }}
                    />
                    {/* Picture Section */}
                    <Box
                        sx={{
                            width: '80%',
                            height: '60%',
                            backgroundColor: '#f0f0f0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: '10%',
                            border: '2px solid #bbb',
                            borderRadius: '4px',
                        }}
                    >
                        <Icon sx={{fontSize: '95%', color}}/>
                    </Box>
                    {/* Animated Arrow Indicator */}
                    {isActive && (
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '-35px', // Position above the polaroid
                                animation: `${bounce} 1.5s infinite`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                pointerEvents: 'none', // Allow clicks to pass through
                            }}
                        >
                            <ArrowDownwardIcon sx={{color, fontSize: 30}}/>
                        </Box>
                    )}
                </Box>
            </Tooltip>
        </ClickAwayListener>
    );
};

export default Polaroid;
