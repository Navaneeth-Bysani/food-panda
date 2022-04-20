import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import './home.css'
import Card from '@mui/material/Card';
import { Button, CardActions, CardContent, makeStyles, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const theme = createTheme();


export default function Home() {

    const [restaurants, setrestaurants] = useState([])

    useEffect(() => {

        axios.get('http://localhost:4000/restaurants').then(result => {
            setrestaurants(result.data.vendors);
            console.log(result);
        })
    }, [])

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
                    Restaurants
                </Typography>
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {restaurants ?
                        restaurants.slice(0, 2).map((restaurant) => {
                            return (<VendorCard rest={restaurant} key = {restaurant[1]} />)
                        }) : null
                    }
                </Box>
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {restaurants ?
                        restaurants.slice(2, 4).map((restaurant) => {
                            return (<VendorCard rest={restaurant} />)
                        }) : null
                    }
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
                    <VendorCard />
                    <VendorCard />
                    <VendorCard />
                </Box>
            </Container>
        </ThemeProvider>
    )
}


const VendorCard = ({ rest }) => {

    const navigate = useNavigate()
    const [state, setState] = useState({
        raised: false,
        shadow: 1,
    })
    const [restaurant, setrestaurant] = useState(rest)


    return (
        <div>
            <Card
                sx={{
                    minWidth: 400,
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
                onClick={() => {
                    navigate('/restaurant/' + restaurant[1])
                }}
            >
                <CardContent>
                    {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Word of the Day
                    </Typography> */}
                    <Typography variant="h5" component="div">
                        {restaurant ? restaurant[0] : "Restaurant Name"}
                    </Typography>
                    {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {restaurant ? restaurant[1] : "id"}
                    </Typography> */}
                    <Typography variant="body2">
                        {restaurant ? restaurant[4] : "Description"}
                    </Typography>
                </CardContent>
                <CardActions sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Button size="small">Order</Button>
                </CardActions>
            </Card>
        </div>
    )
} 