import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { Typography } from '@mui/material';
import MoreOutlinedIcon from '@mui/icons-material/MoreOutlined';
import { DeleteOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';

const Notecard = ({note, onListClick, onDeleteClick}) => {
    return(
        <div>
            <Card sx={{ maxWidth: 220 }}>
                <CardHeader 
                     action={[
                        <IconButton aria-label="settings" onClick={onListClick}>
                        <MoreOutlinedIcon />
                        </IconButton>,
                        <IconButton aria-label="settings" onClick={onDeleteClick}>
                        <DeleteOutlined />
                        </IconButton>
                        ]}
                    titleTypographyProps={{variant:'h6' }}
                    title={note.name}
                />
                <CardContent>
                <Typography sx={{ fontSize: 14 }} color="textSecondary">
                    Average Price : {note.avgprice}
                </Typography>
                    <Typography variant="body1">
                     Description : {note.description}
                    </Typography>
                </CardContent>
            </Card>
        </div>
        
    )
}

export default Notecard
