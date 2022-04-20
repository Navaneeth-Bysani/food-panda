import { Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import styles from './orderModal.css'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


export default function OrderModal({ show, close, orderFood, items }) {

    const orderFoodModal = () => {
        orderFood()
        close()
    }

    const handleClose = () => {
        close()
    }

    return (
        <div className="orderModalContainer">
            <Dialog
                open={show}
                onClose={(_, reason) => {
                    if (reason !== "backdropClick") {
                        handleClose();
                    }
                }}
            >

                <Typography sx={{
                    fontSize: 28,
                    marginTop: 2,
                    marginBottom: 2,
                    marginRight: 18,
                    marginLeft: 18,
                    fontWeight: 600,
                    color: '#9C27B0'
                }}>
                    Your Order
                </Typography>
                <Box className="headings">
                    <Grid container spacing={1}>
                        <Grid item xs={6} style={{

                        }}>
                            <p>Name</p>
                        </Grid>
                        <Grid item xs={3} style={{ textAlign: "center" }}>
                            <p>Quantity</p>
                        </Grid>
                        <Grid item xs={3} style={{ textAlign: "center" }}>
                            <p>Price</p>
                        </Grid>
                    </Grid>
                </Box>
                <div className="items_list">
                    {
                        items.map((itemFood, index) => {
                            return (itemFood.isSelected ?
                                <Box>
                                    <Grid container spacing={1}>
                                        <Grid item xs={6}>
                                            <p>{itemFood.name}</p>
                                        </Grid>
                                        <Grid item xs={3} style={{ textAlign: "center" }}>
                                            <p>{itemFood.quantity}</p>
                                        </Grid>
                                        <Grid item xs={3} style={{ textAlign: "center" }}>
                                            <p>{itemFood.price * itemFood.quantity}</p>
                                        </Grid>
                                    </Grid>
                                </Box>
                                : null)
                        })
                    }
                </div>
                <Box className="buttons">
                    <Grid container spacing={0} style={{
                        marginBottom: "20px"
                    }}
                    >
                        <Grid item xs={1} style={{
                            background: "#FFFFFF"
                        }}></Grid>
                        <Grid item xs={4.5} style={{
                            textAlign: "center",
                            background: "#9C27B0",
                            cursor: "pointer",
                            padding: "6px",
                            borderRadius: "6px"
                        }}
                            onClick={() => { orderFoodModal() }}>
                            <p>{"Place Order"}</p>
                        </Grid>
                        <Grid item xs={1} style={{
                            background: "#FFFFFF"
                        }}>
                        </Grid>
                        <Grid item xs={4.5} style={{
                            textAlign: "center",
                            background: "#9C27B0",
                            cursor: "pointer",
                            padding: "6px",
                            borderRadius: "6px"
                        }}
                            onClick={() => { handleClose() }}>
                            <p>{"Cancel"}</p>
                        </Grid>
                        <Grid item xs={1} style={{
                            background: "#FFFFFF"
                        }}></Grid>
                    </Grid>
                </Box>
                {/* <Box className="closeButton"
                    sx={{
                        background: "#9C27B0"
                    }}
                    onClick={() => { handleClose() }} >
                    Close
                </Box> */}

            </Dialog>
        </div >
    )
}