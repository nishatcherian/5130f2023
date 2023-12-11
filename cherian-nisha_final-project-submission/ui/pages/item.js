import { Container, Typography, Button, Box, Modal, TextField, 
    TableContainer, Paper, Table, TableHead, TableCell, 
    TableBody, TableRow, IconButton } from "@mui/material";
import * as React from 'react';
import { DeleteOutlined } from '@mui/icons-material';
import useSWR, { useSWRConfig } from 'swr'
import { useRouter } from 'next/router';

const fetcher = (...args) => fetch(...args).then((res) => res.json())

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

export default function item() {
    const { mutate } = useSWRConfig()
    const [open, setOpen] = React.useState(false);
    const [newItemName, setNewItemName] = React.useState('')
    const [newItemDescription, setNewItemDescription] = React.useState('')
    const [newItemprice, setNewPrice] = React.useState(0)
    const [newItemLink, setNewLink] = React.useState('')
    const handleOpen = () => setOpen(true);
    const router = useRouter();
    const query = router.query;
    const listid = query.listid;
    const handleItemDelete = (id) => {
        fetch(process.env.NEXT_PUBLIC_BACKEND_PATH+'/lists/' + listid + '/items/' +id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json()

        }).then(data => {
            mutate(process.env.NEXT_PUBLIC_BACKEND_PATH+'/lists/' + listid)
            setOpen(false);
        })
    }
    const handleSubmitButtonClick = () => {
        fetch(process.env.NEXT_PUBLIC_BACKEND_PATH+'/lists/' + listid + '/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    'name': newItemName,
                    'description': newItemDescription,
                    'price': newItemprice,
                    'link': newItemLink,
                    'listid': listid
                }
            )
        }).then(response => {
            return response.json()

        }).then(data => {
            mutate(process.env.NEXT_PUBLIC_BACKEND_PATH+'/lists/' + listid)
            handleClose();
        })

    }
    const handleClose = () => {
        setNewItemName('');
        setNewItemDescription('');
        setNewPrice(0);
        setOpen(false);
    }
    const { data: shoppinglist, error } = useSWR(process.env.NEXT_PUBLIC_BACKEND_PATH+'/lists/' + listid, fetcher)
    if (error) return <div>Failed to load</div>
    if (!shoppinglist) return <div>Loading...</div>
    // console.log(data.items)
    return (
        <div>
            <Container sx={{ top: '100px', left: '0px', position: 'relative' }}>
                <Typography variant="h2" color="textPrimary">{shoppinglist.name}</Typography>
                <Typography variant="subtitle1">{shoppinglist.description}</Typography>
                <br />
                <br />
                <TableContainer component={Paper} sx={{ backgroundColor: 'lightgray', width: '70%' }}>
                    <Table sx={{ minWidth: 650 }} aria-label="item table">
                        <TableHead >
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                                <TableCell align="left" sx={{ fontWeight: 'bold' }}>Notes</TableCell>
                                <TableCell align="left" sx={{ fontWeight: 'bold' }}>Price</TableCell>
                                <TableCell align="left" sx={{ fontWeight: 'bold' }}>Link</TableCell>
                                <TableCell align="left" sx={{ fontWeight: 'bold' }}>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {shoppinglist.items.map((item) => (
                                <TableRow
                                    key={item.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {item.name}
                                    </TableCell>
                                    <TableCell align="left">{item.description}</TableCell>
                                    <TableCell align="left">{item.price}</TableCell>
                                    <TableCell align="left"><a href={item.link}>Link</a></TableCell>
                                    <TableCell align="left"><IconButton aria-label="settings" onClick={()=>{handleItemDelete(item.id)}}>
                                        <DeleteOutlined />
                                    </IconButton></TableCell>
                                </TableRow>

                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <br />
                <Box sx={{ width: '70%' }}>
                    <Button variant="contained" sx={{ float: 'right' }} onClick={handleOpen}>Add Item</Button>
                </Box>
            </Container>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add an item
                    </Typography>
                    <br />
                    <TextField required label="Item name" sx={{
                        width: '800px'
                    }} onChange={(e) => setNewItemName(e.target.value)}></TextField>
                    <br />
                    <br />
                    <br />
                    <TextField label="Item notes" multiline rows={7} sx={{
                        width: '800px'
                    }} onChange={(e) => setNewItemDescription(e.target.value)}></TextField>
                    <br />
                    <br />
                    <TextField label="Price" sx={{
                        width: '800px'
                    }} onChange={(e) => setNewPrice(e.target.value)}></TextField>
                    <br />
                    <br />
                    <TextField label="Link" sx={{
                        width: '800px'
                    }} onChange={(e) => setNewLink(e.target.value)}></TextField>
                    <br />
                    <br />
                    <Button variant="contained" sx={{ float: 'right' }} onClick={handleSubmitButtonClick}>Submit</Button>
                </Box>
            </Modal>
        </div>
    )
}