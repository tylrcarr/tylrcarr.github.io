// Refrigerator.tsx
import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import {
    PhotoCamera,
    ChatBubbleOutline,
    MusicNote,
    FormatQuote,
    CurrencyBitcoin,
    BuildCircleOutlined
} from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import Polaroid from './Polaroid'; // Adjust the path as necessary

const Refrigerator: React.FC = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                width: '90%',
                maxWidth: '600px',
                height: '80vh',
                background: '#f9f9f9',
                border: '2px solid #aaa',
                borderRadius: '10px',
                boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
                position: 'relative',
                overflow: 'hidden',
                margin: 'auto',
            }}
        >
            {/* Fridge Divider */}
            {!isSmallScreen && (
                <Box
                    sx={{
                        position: 'absolute',
                        width: '4px',
                        height: '100%',
                        backgroundColor: '#666',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 3,
                    }}
                />
            )}
            {/* Single Handle */}
            <Box
                sx={{
                    position: 'absolute',
                    width: '10%',
                    height: '10%',
                    maxHeight: '50px',
                    backgroundColor: '#d3d3d3',
                    borderRadius: '5px',
                    left: isSmallScreen ? '95%' : '50%',
                    top: '40%',
                    transform: isSmallScreen ? 'translate(-100%, 0)' : 'translate(-50%, 0)',
                    zIndex: 2,
                    ...(isSmallScreen
                        ? {}
                        : {
                            '&:before': {
                                content: '""',
                                position: 'absolute',
                                width: '2px',
                                height: '100%',
                                backgroundColor: '#666',
                                left: '50%',
                                transform: 'translateX(-50%)',
                            },
                        }),
                }}
            />
            {/* Manufacturer Logo */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '5%',
                    left: '5%',
                    background: '#bbb',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        color: '#333',
                        fontFamily: "'Brush Script MT', cursive",
                        fontSize: '1.5vw',
                    }}
                >
                    Tyler
                </Typography>
            </Box>
            {/* Polaroids */}
            <Polaroid
                icon={PhotoCamera}
                label="Photography"
                color="blue"
                position={{ top: '20%', left: '10%' }}
                rotation={-5}
                onClick={() => navigate("/photos")}
            />
            <Polaroid
                icon={BuildCircleOutlined}
                label="Tools"
                color="green"
                position={{ top: '60%', left: '30%' }}
                rotation={-5}
                onClick={() => navigate("/tools")}
            />
            <Polaroid
                icon={MusicNote}
                label="Music"
                color="purple"
                position={{ top: '60%', left: '70%' }}
                rotation={-8}
                onClick={() => navigate("/music")}
            />
            <Polaroid
                icon={FormatQuote}
                label="Quotes"
                color="orange"
                position={{ top: '10%', left: '80%' }}
                rotation={4}
                onClick={() => alert('Clicked on Quotes')}
            />
        </Box>
    );

};

export default Refrigerator;
