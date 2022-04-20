import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { Button, Container, CssBaseline, Typography } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faCircle, faCheckCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import './restaurant.css'
import { fontSize } from "@mui/system";
import OrderModal from "./ordermodal/OrderModal";

const theme = createTheme();

export default function Restaurant() {
    let { rId } = useParams()
    const [items, setItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0);
    const [showOrderModal, setshowOrderModal] = useState(false)

    const showOrderModalOnClick = () => {
        setshowOrderModal(true)
    }

    const closeOrderModalOnClick = () => {
        setshowOrderModal(false)
    }

    useEffect(() => {
        getItems()
    }, [])

    const getItems = () => {
        axios.get('http://localhost:4000/restaurants/items/' + rId).then(result => {
            let itemsArr = []
            result.data.items.rows.map((item) => {
                itemsArr.push({
                    ID: item.ID,
                    name: item.NAME,
                    quantity: 0,
                    price: item.PRICE,
                    isSelected: false
                })
            })
            console.log(itemsArr)
            setItems(itemsArr)
        })
    }
    const toggleComplete = (index) => {
        const newItems = [...items];
        let price = totalPrice
        if (newItems[index].isSelected) {
            newItems[index].isSelected = !newItems[index].isSelected;
            price = price - newItems[index].quantity * newItems[index].price
            newItems[index].quantity = 0
        } else {
            newItems[index].isSelected = !newItems[index].isSelected;
            newItems[index].quantity = 1
            price = price + newItems[index].quantity * newItems[index].price
        }


        setTotalPrice(price)
        setItems(newItems);
    };

    const handleQuantityIncrease = (index) => {
        const newItems = [...items];
        let price = 0;
        if (newItems[index].isSelected) {
            newItems[index].quantity++;
            price = price + newItems[index].price;
        }
        setTotalPrice(totalPrice + price);
        setItems(newItems);
    };

    const handleQuantityDecrease = (index) => {
        const newItems = [...items];
        let price = 0;
        if (newItems[index].quantity > 0 && newItems[index].isSelected) {
            newItems[index].quantity--;
            price = price + newItems[index].price;
        }
        setTotalPrice(totalPrice - price);
        setItems(newItems);
    };

    const orderFood = () => {
        const orderedItems = []
        items.map((item, index) => {
            if (item.isSelected) {
                orderedItems.push({
                    itemId: item.ID,
                    quantity: item.quantity
                })
            }
        })
        console.log(orderedItems);
        axios.post('http://localhost:4000/users/order/' + rId, {
            items: orderedItems
        },
            { withCredentials: true }
        ).then(result => {
            console.log("Hi")
            console.log(result)
            setItems([])
            getItems()
            setTotalPrice(0)
            closeOrderModalOnClick()
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <ThemeProvider theme={theme}>
            <OrderModal
                show={showOrderModal}
                close={closeOrderModalOnClick}
                orderFood={orderFood}
                items={items}
            />
            <div className="title">
                Hungry Bird
            </div>
            <Container component="main">
                <CssBaseline />
                <Typography sx={{
                    fontSize: 28,
                    marginTop: 4,
                    fontWeight: 600,
                    display: 'flex',
                    textAlign: 'left',
                    color: '#9C27B0'
                }}>
                    {"Restaurant - " + rId}
                </Typography>
                <Typography sx={{
                    fontSize: 28,
                    marginTop: 2,
                    fontWeight: 600,
                    color: '#9C27B0'
                }}>
                    Menu
                </Typography>
                <Typography sx={{
                    fontSize: 20,
                    marginTop: 6,
                    fontWeight: 10,
                    color: 'black'
                }}>
                    Total Price - Rs.{totalPrice}
                </Typography>
                <div className='item-list'>
                    {items.map((item, index) => (
                        <div className='item-container' key={index}>
                            <div className='item-name' onClick={() => toggleComplete(index)}>
                                {item.isSelected ? (
                                    <>
                                        <FontAwesomeIcon icon={faCheckCircle} />
                                        <span className='completed'>{`${item.name} - Rs.${item.price}`}</span>
                                    </>
                                ) : (
                                    <>
                                        <FontAwesomeIcon icon={faCircle} />
                                        <span>{`${item.name} - Rs.${item.price}`}</span>
                                    </>
                                )}
                            </div>
                            <div className='quantity'>
                                <button>
                                    <FontAwesomeIcon icon={faChevronLeft} onClick={() => handleQuantityDecrease(index)} />
                                </button>
                                <span> {item.quantity} </span>
                                <button>
                                    <FontAwesomeIcon icon={faChevronRight} onClick={() => handleQuantityIncrease(index)} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <Button sx={{
                    marginTop: 5,
                    marginBottom: 5,
                    fontSize: 20,
                    background: '#9C27B0',
                    color: '#FFFFFF'
                }} onClick={() => {
                    showOrderModalOnClick()
                }}>
                    Order
                </Button>
            </Container>
        </ThemeProvider>
    )
}