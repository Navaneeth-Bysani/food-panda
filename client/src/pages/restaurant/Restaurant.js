import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { Button, Container, CssBaseline, Typography } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faCircle, faCheckCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import './restaurant.css'
import { fontSize } from "@mui/system";

const theme = createTheme();

export default function Restaurant() {
    let { rId } = useParams()
    const [items, setItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:4000/restaurants/items/' + rId).then(result => {
            let itemsArr = []
            result.data.items.rows.map((item) => {
                itemsArr.push({
                    ID: item.ID,
                    name: item.NAME,
                    quantity: 0,
                    price : item.PRICE,
                    isSelected: false
                })
            })
            console.log(itemsArr)
            setItems(itemsArr)
        })
    }, [])

    const toggleComplete = (index) => {
        const newItems = [...items];

        newItems[index].isSelected = !newItems[index].isSelected;

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
                        <div className='item-container' key = {index}>
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
                    console.log(items)
                }}>
                    Order
                </Button>
            </Container>
        </ThemeProvider>
    )
}