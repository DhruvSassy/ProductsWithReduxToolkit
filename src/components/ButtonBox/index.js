import React from 'react';
import { Button } from '@mui/material';


const ButtonBox = (props) => {
    const {onClick,title,sx} = props;
    return (
        <div>
            <Button
                variant="contained"
                onClick={onClick}
                sx={sx}
            >
                 {title}
            </Button>
        </div>
    )
}

export default ButtonBox