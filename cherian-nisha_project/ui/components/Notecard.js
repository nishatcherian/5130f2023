import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { Typography } from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';

const Notecard = ({note}) => {
    return(
        <div>
            <Card sx={{ maxWidth: 220 }}>
                <CardHeader 
                     action={
                        <IconButton aria-label="settings">
                          <DeleteOutlined />
                        </IconButton>
                      }
                    titleTypographyProps={{variant:'h6' }}
                    title={note.title}
                />
                <CardContent>
                <Typography sx={{ fontSize: 14 }} color="textSecondary">
                    Average Price : {note.price}
                </Typography>
                    <Typography variant="body1">
                     Description : {note.details}
                    </Typography>
                </CardContent>
            </Card>
        </div>
        
    )
}

export default Notecard
