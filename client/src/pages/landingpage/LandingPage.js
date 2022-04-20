import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate } from 'react-router-dom';
import './landingpage.css';

const theme = createTheme();

export default function SignIn() {
    const navigate = useNavigate();
    return (
        <ThemeProvider theme={theme}>
        <div className="title">
            Hungry Bird
        </div>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            
                <img 
                src = "https://imgs.search.brave.com/b5tgAhCADM2rWXOYBvUULGbLhI9EJNRaCI7UlVwCurw/rs:fit:498:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5E/Y21RYm9fTFJXZm1K/ajE2aWpKV1lBSGFI/RCZwaWQ9QXBp"
                style = {{margin : '10px'}}
                />
            <Box>
                <Typography component="h1" variant="h5">
                    Are you hungry?
                </Typography>
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 1 }}
                    onClick = {() => {
                        navigate('/signin')
                    }}
                >Login</Button>
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 1, mb: 4 }}
                    onClick = {() => {
                        navigate('/signup')
                    }}
                >Sign up</Button>

                <Typography component="h1" variant="h5">
                    Are you a food partner?
                </Typography>
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 1 }}
                    onClick = {() => {
                        navigate('/signin-vendor')
                    }}
                >Login as a vendor</Button>
            </Box>
            </Box>
        </Container>
        </ThemeProvider>
    );
}