import React from 'react';

import { Alert, Snackbar } from '@mui/material';

const SnackBar = ({open, setOpen, title,severity }) => {
    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={9000}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {title}
            </Alert>
        </Snackbar>
    );
};

export default SnackBar;
