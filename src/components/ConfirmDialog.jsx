import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography, useTheme } from '@mui/material'
import React from 'react'
import CustomButton from './controls/CustomButton';
import { NotListedLocation } from '@mui/icons-material';

export default function ConfirmDialog(props) {
    const { confirmDialog, setConfirmDialog, data } = props;
    const theme = useTheme();

    const style = {
        dialog: {
            padding: "20px",
            position: "absolute",
            top: "50px"
        },
        titleIcon: {
            backgroundColor: '#fff0f5',
            color: "ffffff",
            "&:hover": {
                backgroundColor: '#00aa00',
                cursor: "default"
            },
            "& .MuiSvgIcon-root": {
                fontSize: "8rem"
            }
        }
    };

    return (
        <Dialog open={confirmDialog.isOpen} sx={{
            '& .MuiDialog-paper': {
                width: '50%',
                Height: '40%',
            },
            '& .MuiPaper-root': {
                background: theme.palette.background.alt,
            },
            textAlign: "center",
        }}>
            <DialogTitle>
                <IconButton disableRipple sx={style.titleIcon}>
                    <NotListedLocation />
                </IconButton>
            </DialogTitle>
            <DialogContent width='auto'>
                <Typography variant="h6">
                    {confirmDialog.title}
                </Typography>
                <Typography variant="subtitle2">
                    {confirmDialog.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions
                sx={{
                    justifyContent: "center",
                    gap: "1rem"
                }}
            >
                <CustomButton
                    text="Không"
                    color="primary"
                    onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
                />
                <CustomButton
                    text="Có"
                    color="secondary"
                    onClick={confirmDialog.onConfirm}
                />
            </DialogActions>
        </Dialog>
    )
}
