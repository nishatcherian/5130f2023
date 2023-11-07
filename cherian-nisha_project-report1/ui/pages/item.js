import { Container, Typography, Button, Box, Modal, TextField } from "@mui/material";
import * as React from 'react';
import ItemTable from "@/components/itemtable";
import useSWR, { useSWRConfig } from 'swr'

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
    const handleOpen = () => setOpen(true);
    const handleSubmitButtonClick = () => {
        fetch('https://z76dl.wiremockapi.cloud/lists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json()

        }).then(data => {
            console.log(data)
            console.log(newItemName)
            mutate('https://z76dl.wiremockapi.cloud/lists/12')
            setOpen(false);
        })

    }
    const handleClose = () => {
        setOpen(false);
    }
    const { data: shoppinglist, error } = useSWR('https://z76dl.wiremockapi.cloud/lists/12', fetcher)
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
            
        </div>
    )
}