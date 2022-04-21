import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import './orders.css'
import Card from '@mui/material/Card';
import { Button, CardActions, CardContent, makeStyles, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const theme = createTheme();


export default function Home() {

    const [orders, setOrders] = useState([])

    useEffect(() => {
        // let restaurantId = 'restaurant-01';
        axios.get(`http://localhost:4000/restaurants/orders-self`, {
            withCredentials: true
        }).then(result => {
            setOrders(result.data.orders);
            console.log(result.data);
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
                    Orders
                </Typography>
                <Box>
                    {orders.map((order, index) => (
                        <OrderCard order={order} key={index} />
                    ))}
                </Box>
            </Container>
        </ThemeProvider>
    )
}

const OrderCard = (props) => {
    const finishOrder = () => {
        //route - /restaurants/orders/orderId PATCH
        axios.patch('http://localhost:4000/restaurants/orders/' + props.order.ID, {

        }, {
            withCredentials: true
        }).then(result => {
            console.log(result)
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <div>
            <Card
                style={{ margin: '15px', width: '40%', display: 'inline-block' }}
            >
                <CardContent>
                    <Typography variant="h5" component="div">
                        {props.order ? props.order.ID : "Order ID"}
                    </Typography>

                    <Typography variant="body2">
                        {props.order ? props.order.NAME : "Name of customer"}
                    </Typography>
                    <Typography variant="body2">
                        {props.order ? props.order.PHONE : "phone number of customer"}
                    </Typography>
                    <CardActions sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Button size="small" onClick={finishOrder}>Completed</Button>
                        <Button size="small">List</Button>
                    </CardActions>
                </CardContent>
                {/* <CardContent >
                    <Typography variant="body2">
                        cheese burger - 5 - Rs.200
                    </Typography>
                    <Typography variant="body2">
                        maggi - 6 - Rs.120
                    </Typography>
                </CardContent> */}

            </Card>
        </div>
    )
}

// const VendorCard = ({ rest }) => {

//     const navigate = useNavigate()
//     const [state, setState] = useState({
//         raised: false,
//         shadow: 1,
//     })
//     const [restaurant, setrestaurant] = useState(rest)


//     return (
//         <div>
//             <Card
//                 sx={{
//                     minWidth: 400,
//                     marginLeft: 8,
//                     marginRight: 8,
//                     marginTop: 3,
//                     transition: "transform 0.15s ease-in-out",
//                     cursor: 'pointer'
//                 }}
//                 classes={{
//                     root: state.raised ? {
//                         transform: "scale3d(1.05, 1.05, 1)"
//                     } : ""
//                 }}
//                 onMouseOver={() => setState({ raised: true, shadow: 3 })}
//                 onMouseOut={() => setState({ raised: false, shadow: 1 })}
//                 raised={state.raised} zdepth={state.shadow}
//                 onClick={() => {
//                     navigate('/restaurant/' + restaurant[1])
//                 }}
//             >
//                 <CardContent>
//                     {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//                         Word of the Day
//                     </Typography> */}
//                     <Typography variant="h5" component="div">
//                         {restaurant ? restaurant[0] : "Restaurant Name"}
//                     </Typography>
//                     {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
//                         {restaurant ? restaurant[1] : "id"}
//                     </Typography> */}
//                     <Typography variant="body2">
//                         {restaurant ? restaurant[4] : "Description"}
//                     </Typography>
//                 </CardContent>
//                 <CardActions sx={{
//                     display: 'flex',
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     justifyContent: 'center'
//                 }}>
//                     <Button size="small">Order</Button>
//                 </CardActions>
//             </Card>
//         </div>
//     )
// } 