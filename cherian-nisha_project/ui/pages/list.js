import { Container, Typography, Button, Box, Modal, TextField } from "@mui/material";
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Notecard from '@/components/Notecard';

var notes = [
      {
        "title": "Backpack",
        "details": "Research on good travel backpacks.",
        "price": "500",
        "id": 1
      },
      {
        "title": "Recliner",
        "details": "Need power recliners.",
        "price": "700",
        "id": 2
      },
      {
        "title": "Laptop for Mom",
        "details": "Cheap but good windows laptop.",
        "price": "300",
        "id": 4
      },
      {
        "title": "Tablecloth",
        "details": "Vinyl tablecloth. Size 70 x 90. Should be washable",
        "price": "50",
        "id": 5
      },
      {
        "title": "Tops",
        "details": "Tops to wear during summer.",
        "price": "100",
        "id": 6
      },
      {
        "title": "Shoes",
        "details": "Shoes for running.",
        "price": "200",
        "id": 7
      }
    ]
const modalStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 800,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
};

export default function list() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    return(
        <div>
        <br/>
        <br/>
        <br/>
        <Box display="flex" justifyContent="center" alignItems="center">
        <Button onClick={handleOpen}>Create new list</Button>
        </Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create new shopping list
          </Typography>
          <TextField required label="List Name" sx={{
                        width: '800px'
                    }} ></TextField>
          <br />
          <br />
          <br />
          <TextField required label="Average Price" sx={{
                        width: '800px'
          }}></TextField>
          <br />
          <br />
          <TextField required label="List description" multiline rows={7} sx={{
            width: '800px'
            }}></TextField>
          <br />
          <br />
                   
          <Button variant="contained" sx={{ float: 'right' }}>Submit</Button>
          
        </Box>
        </Modal>
        <br/>
        <br/>
        <br/>
        <br/>
        <Grid container spacing={5}>
            {notes.map(note => (
                <Grid item lg={3} key = {note.id}>
                <Notecard note={note}/>
                </Grid>
            ))}
        </Grid>
        </div>
    );
  }