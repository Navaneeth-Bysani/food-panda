import './vendorHome.css';
import { useEffect, useState } from "react"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import axios from 'axios';

export default function AddItem(props) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        props.handleSubmit(name, price);
        return;
    }
    return (
        <Modal
            open={props.modalOpen}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Give Item details
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              id="name"
              label="item name"
              name="name"
              autoComplete="item name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={price}
              onChange={(e) =>
                setPrice(e.target.value)
              }
              name="price"
              label="price"
              type="price"
              id="price"
              autoComplete="current-price"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    )
}
