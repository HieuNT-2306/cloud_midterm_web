import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import React from 'react'
import CustomButton from './controls/CustomButton';
import ActionButton from './controls/ActionButton';

export default function Popup(props) {
    const { title, children, openPopup, setOpenPopup } = props;

    return (
        <Dialog
            open={openPopup}
            maxWidth="md"
            sx={{
                '& .MuiDialog-paper': {
                    width: '90%',
                    maxHeight: '90%',
                },
                '& .MuiPaper-root': {
                    background: '#fff0f5',
                },
                //border none?
            }}
        >
            <DialogTitle>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <Typography variant="h5" component="div" align='justify'>
                        {title}
                    </Typography>
                    <ActionButton 
                        color="primary" 
                        onClick={() => setOpenPopup(false)} 
                    >
                        X
                    </ActionButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}
