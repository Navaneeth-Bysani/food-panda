import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { Button, Container, CssBaseline, Typography, Box } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faCircle, faCheckCircle, faPlus, faTrash, faAdd, faPen } from '@fortawesome/free-solid-svg-icons';
import './vendorHome.css'
import { fontSize } from "@mui/system";
import AddItemModal from './AddItemForm';
import UpdateItemModal from './UpdateItem';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';

const theme = createTheme();

export default function Restaurant() {
    let { rId } = useParams()
    const [items, setItems] = useState([])
    const [modalOpen, setModalOpen] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
    const navigate = useNavigate()
    const [updatingItem, setUpdatingItem] = useState({
        id: -1,
        name: "",
        price: 0
    });

    useEffect(() => {
        axios.get('http://localhost:4000/restaurants/items-self', {
            withCredentials: true
        }).then(result => {
            let itemsArr = []
            result.data.items.rows.map((item) => {
                itemsArr.push({
                    ID: item.ID,
                    name: item.NAME,
                    price: item.PRICE
                })
            })

            setItems(itemsArr)
        })
    }, [])



    const handleDelete = (itemId, index) => {
        console.log(itemId);
        axios.delete(`http://localhost:4000/restaurants/items/${itemId}`, {
            withCredentials: true
        }).then(result => {
            console.log(result);
            if (result.data.status === "success") {
                console.log(items);
                let newItems = [...items];
                newItems.splice(index, 1);
                setItems(newItems);
                console.log(items);
            }
        })
    };

    const handleUpdate = (itemId, index) => {
        setUpdatingItem({
            id: itemId,
            name: items[index].name,
            price: items[index].price,
            index: index
        });
        setUpdating(true);
    }

    const updateItem = (name, price, id, index) => {
        axios.patch(`http://localhost:4000/restaurants/items/${id}`, {
            name: name,
            price: price
        }, {
            withCredentials: true
        }).then(result => {
            if (result.data.status === "success") {
                let newItems = items;
                newItems[index].name = name;
                newItems[index].price = price;
                setItems(newItems);
                setUpdating(false);
            }
        })
    }

    const addItem = (name, price) => {
        // const restName = 'restaurant-01';
        axios.post(`http://localhost:4000/restaurants/items`, {
            name: name,
            price: price
        }, {
            withCredentials: true
        }).then(result => {
            console.log("Hi")
            console.log(result);
            if (result.data.status === "success") {
                let newItems = [...items];
                newItems.push({
                    ID: result.data.item.outBinds.ids[0],
                    name: name,
                    price: price
                });
                setModalOpen(false);
                setItems(newItems);

            }
        })
    }

    const logout = () => {
        removeCookie('jwt')
        navigate('/signin-vendor')
    }

    return (
        <ThemeProvider theme={theme}>
            <div className="title">
                Hungry Bird
            </div>
            <div className='logout' onClick={() => {
                logout()
            }}>
                <p>Logout</p>
            </div>
            <div className='orders' onClick={() => {
                navigate('/orders')
            }}>
                <p>{"Go To Orders ->"}</p>
            </div>
            <AddItemModal modalOpen={modalOpen} handleClose={() => setModalOpen(false)} handleSubmit={addItem} />
            {updating ? (<UpdateItemModal modalOpen={updating} handleClose={() => setUpdating(false)}
                handleSubmit={updateItem} item={updatingItem}
            />) : null}

            <Container component="main">
                <CssBaseline />
                <Typography sx={{
                    fontSize: 28,
                    marginTop: 2,
                    fontWeight: 600,
                    color: '#9C27B0'
                }}>
                    Menu
                </Typography>
                <div>
                    <Button
                        variant="contained"
                        style={{ margin: '10px', display: 'inline-block' }}
                        onClick={() => {
                            setModalOpen(true)
                        }}
                    >
                        Add Item
                    </Button>
                </div>


                <div className='item-list' style={{ margin: '40px' }}>
                    {items.map((item, index) => (
                        <div className='item-container' key={index}>
                            <div className='item-name'>
                                <span className='completed'>{`${item.name} - Rs.${item.price}`}</span>
                            </div>
                            <div>
                                <button>
                                    <FontAwesomeIcon
                                        icon={faPen}
                                        onClick={() => handleUpdate(item.ID, index)}
                                        style={{ size: '20px' }}
                                    />
                                </button>
                                {'  '}
                                <button>
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        onClick={() => handleDelete(item.ID, index)}
                                        style={{ size: '20px' }}
                                    />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </ThemeProvider>
    )
}