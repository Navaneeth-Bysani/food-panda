import * as React from 'react';
import { useState, useEffect } from 'react';
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
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import './signInVendor.css';

const theme = createTheme();

export default function SignInVendor() {

    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [cookies, setCookie] = useCookies(['jwt']);
    const navigate = useNavigate()


    useEffect(() => {

        const jwt = cookies.jwt
        if (jwt) {
            navigate('/home')
        }

    }, [])


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            username: username,
            password: password,
        });
        axios.post('http://localhost:4000/auth/login', {
            email: username,
            password: password
        }).then(result => {
            console.log(result);
            setCookie('jwt', result.data.token, { path: '/' });
            navigate('/home')
        })
    };

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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Vendor Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            value={username}
                            onChange={(e) =>
                                setusername(e.target.value)
                            }
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            value={password}
                            onChange={(e) =>
                                setpassword(e.target.value)
                            }
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        {/* <Link href="/signup" variant="body2">
                            Don't have an account? Sign Up
                        </Link> */}
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}