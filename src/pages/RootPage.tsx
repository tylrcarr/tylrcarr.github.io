// src/pages/RootPage.tsx

import React, {useState} from 'react';
import {Box, Button, Paper, TextField, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';

// A styled container with a cool gradient background
const RootContainer = styled(Box)(({theme}) => ({
    height: '100dvh',
    background: 'linear-gradient(135deg, #f6d365, #fda085)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));

// A styled Paper component for the content
const ContentPaper = styled(Paper)(({theme}) => ({
    padding: theme.spacing(4),
    textAlign: 'center',
    maxWidth: 400,
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[6],
}));

export const RootPage: React.FC = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        setError('');
    };

    const handleSubmit = () => {
        if (password === 'color') {
            navigate('/home');
        } else {
            setError('Incorrect password');
        }
    };

    return (
        <RootContainer>
            <ContentPaper>
                <Box>
                    <img
                        src="/public-photos/me.jpg"
                        alt="Tyler Carr"
                        style={{width: '100%', borderRadius: '50%'}}
                    />
                </Box>
                <Typography variant="h3" sx={{mt: 2, mb: 2}}>
                    Tyler Carr
                </Typography>
                <TextField
                    type="password"
                    label="Enter Password"
                    value={password}
                    onKeyDown={event => {
                        if (event.key === 'Enter') {
                            handleSubmit();
                        }
                    }}
                    onChange={handlePasswordChange}
                    error={!!error}
                    helperText={error}
                    fullWidth
                    sx={{mb: 2}}
                    slotProps={{
                        htmlInput: {
                            enterKeyHint: "go"
                        }
                    }}
                />
                <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                    Enter
                </Button>
            </ContentPaper>
        </RootContainer>
    );
};

