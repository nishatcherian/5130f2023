import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ShopIcon from '@mui/icons-material/Shop';
export default function Header() {
    return(
        <header>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" color='transparent'>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                        <ShopIcon color='primary' fontSize='large'/>
                        </IconButton>
                        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                        ShopWhiz
                        </Typography>
                        {/* <Button color="inherit">Logout</Button> */}
                    </Toolbar>
                </AppBar>
            </Box>
        </header>
    );
}