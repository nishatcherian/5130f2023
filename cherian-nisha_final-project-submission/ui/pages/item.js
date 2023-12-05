import { Container, Typography, Button, Box, Modal, TextField } from "@mui/material";
import * as React from 'react';
import ItemTable from "@/components/itemtable";
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
    const handleSubmitButtonClick = () => {
        fetch('http://localhost:8000/lists/'+listid+'/items', {
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
            mutate('http://localhost:8000/lists/'+ listid)
            setOpen(false);
        })

    }
    const handleClose = () => {
        setOpen(false);
    }
    console.log('listid: '+ listid)
    const { data: shoppinglist, error } = useSWR('http://localhost:8000/lists/'+ listid, fetcher)
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
                <ItemTable items={shoppinglist.items}></ItemTable>
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
                    <TextField required label="Item description" multiline rows={7} sx={{
                        width: '800px'
                    }} onChange={(e) => setNewItemDescription(e.target.value)}></TextField>
                    <br />
                    <br />
                    <TextField required label="Price" sx={{
                        width: '800px'
                    }} onChange={(e) => setNewPrice(e.target.value)}></TextField>
                    <br />
                    <br />
                    <TextField required label="Link" sx={{
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