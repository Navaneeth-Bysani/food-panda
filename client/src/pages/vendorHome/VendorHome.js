import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { Button, Container, CssBaseline, Typography } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faCircle, faCheckCircle, faPlus, faTrash, faAdd } from '@fortawesome/free-solid-svg-icons';
import './vendorHome.css'
import { fontSize } from "@mui/system";


const theme = createTheme();

export default function Restaurant() {
    let { rId } = useParams()
    const [items, setItems] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/restaurants/items/' + 'restaurant-01').then(result => {
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

    const handleDelete = (itemId, index) => {
        console.log(itemId);
        axios.delete(`http://localhost:4000/restaurants/items/${itemId}`).then(result => {
            console.log(result);
            if(result.data.status === "success") {
                console.log(items);
                let newItems = items;
                newItems.splice(index, 1);
                setItems(newItems);
                console.log(items);
            }
        })
    };

    const addItem = () => {
        
    }

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
                <Button 
                variant="contained"
                style = {{float : 'right', margin : '10px'}}
                onClick = {() => addItem()}
                >
                    Add Item
                </Button>
                <div className='item-list' style={{margin : '40px'}}>
                    {items.map((item, index) => (
                        <div className='item-container' key = {index}>
                            <div className='item-name'>
                                <span className='completed'>{`${item.name} - Rs.${item.price}`}</span>
                            </div>
                            <div>
                                <button>
                                    <FontAwesomeIcon 
                                    icon={faTrash} 
                                    onClick={() => handleDelete(item.ID, index)} 
                                    style = {{size : '20px'}}
                                    />
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