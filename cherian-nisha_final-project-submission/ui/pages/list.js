import { Container, Typography, Button, Box, Modal, TextField } from "@mui/material";
import useSWR, { useSWRConfig } from 'swr'
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Notecard from '@/components/Notecard';
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

export default function list() {
  const { mutate } = useSWRConfig()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [newListName, setNewListName] = React.useState('')
  const [newListDescription, setNewListDescription] = React.useState('')
  const router = useRouter();
  const query = router.query;
  const userid = query.userid;
  const handleListClick = (listid) => {
    router.push('/item?listid='+listid)
    // console.log(listid)
  }
  const handleSubmitButtonClick = () => {
    
    fetch(process.env.NEXT_PUBLIC_BACKEND_PATH+ '/lists', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                'name': newListName,
                'description': newListDescription,
                'userid': userid
            }
        )
    }).then(response => {
        return response.json()

    }).then(data => {
        mutate(process.env.NEXT_PUBLIC_BACKEND_PATH+'/lists?userid='+userid)
        setOpen(false);
    })
 }
 const handleListDelete = (listid) => {
  fetch(process.env.NEXT_PUBLIC_BACKEND_PATH+'/lists/'+listid, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
      }
  }).then(response => {
      return response.json()

  }).then(data => {
      mutate(process.env.NEXT_PUBLIC_BACKEND_PATH+'/lists?userid='+userid)
  })

}



  const { data: shoppinglists, error } = useSWR(process.env.NEXT_PUBLIC_BACKEND_PATH+'/lists?userid='+userid,
    fetcher)
  if (error) return <div>Failed to load</div>
  if (!shoppinglists) return <div>Loading...</div>
  return (
    <div>
      <br />
      <br />
      <br />
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
          }} onChange={(e) => setNewListName(e.target.value)}></TextField>
          <br />
          <br />
          <br />
          <TextField label="List description" multiline rows={7} sx={{
            width: '800px'
          }} onChange={(e) => setNewListDescription(e.target.value)}></TextField>
          <br />
          <br />

          <Button variant="contained" sx={{ float: 'right' }} onClick={handleSubmitButtonClick}>Submit</Button>

        </Box>
      </Modal>
      <br />
      <br />
      <br />
      <br />
      <Grid container spacing={5}>
        {shoppinglists.map(shoppinglist => (
          <Grid item lg={3} key={shoppinglist.id}>
          <Notecard note={shoppinglist} onListClick={()=>handleListClick(shoppinglist.id)} onDeleteClick={() => handleListDelete(shoppinglist.id)}/>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}