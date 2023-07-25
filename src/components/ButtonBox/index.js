import React from 'react';
import { Button } from '@mui/material';


const ButtonBox = (props) => {
    const {onClick} = props;
    return (
        <div>
            <Button
                variant="contained"
                onClick={onClick}
              
            >
                 Add Product
            </Button>
        </div>
    )
}

export default ButtonBox