import { useState } from 'react';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import './vendorHome.css';
import Card from '@mui/material/Card';
import { Button, CardActions, CardContent, makeStyles, Typography } from '@mui/material';


const theme = createTheme();


export default function VendorHome() {


    return (
        <ThemeProvider theme={theme}>
            <div className="title">
                Hungry Bird
            </div>
            <Container component="main">
                <CssBaseline />
                <Typography sx={{
                    fontSize: 28,
                    marginTop: 6,
                    fontWeight: 600,
                    color: '#9C27B0'
                }}>
                    Items in Restaurant
                </Typography>
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <ItemsCard />
                    <ItemsCard />
                    <ItemsCard />
                </Box>
                <Typography sx={{
                    fontSize: 28,
                    marginTop: 6,
                    fontWeight: 600,
                    color: '#9C27B0'
                }}>
                    Orders
                </Typography>
                <Box
                    sx={{
                        marginTop: 2,
                        marginBottom: 4,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <ItemsCard />
                    <ItemsCard />
                    <ItemsCard />
                </Box>
            </Container>
        </ThemeProvider>
    )
}


const ItemsCard = () => {

    const [state, setState] = useState({
        raised: false,
        shadow: 1,
    })


    return (
        <div>
            <Card
                sx={{
                    minWidth: 275,
                    marginLeft: 8,
                    marginRight: 8,
                    marginTop: 3,
                    transition: "transform 0.15s ease-in-out",
                    cursor: 'pointer'
                }}
                classes={{
                    root: state.raised ? {
                        transform: "scale3d(1.05, 1.05, 1)"
                    } : ""
                }}
                onMouseOver={() => setState({ raised: true, shadow: 3 })}
                onMouseOut={() => setState({ raised: false, shadow: 1 })}
                raised={state.raised} zdepth={state.shadow}
            >
                <CardContent>
                    {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Word of the Day
                    </Typography> */}
                    <Typography variant="h5" component="div">
                        Restaurant Name
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Location
                    </Typography>
                    <Typography variant="body2">
                        No. of orders remaining:
                    </Typography>
                    <Typography variant="body2">
                        Approx wait time:
                    </Typography>
                </CardContent>
                <CardActions sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Button size="small"
                    onClick={() => {
                        
                    }}
                    >delete</Button>
                </CardActions>
            </Card>
        </div>
    )
} 