import React from 'react';

import { Button } from '@mui/material';

const ButtonBox = (props) => {
    const {color,onClick,title,sx,className} = props;
    return (
              <Button
                color={color}
                variant="contained"
                className={className}
                onClick={onClick}
                sx={sx}
            >
                 {title}
            </Button>
    )
}

export default ButtonBox