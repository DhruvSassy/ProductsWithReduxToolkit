import React from 'react';

import { Button } from '@mui/material';

const ButtonBox = (props) => {
    const {onClick,title,sx,className} = props;
    return (
        <div>
            <Button
                variant="contained"
                className={className}
                onClick={onClick}
                sx={sx}
            >
                 {title}
            </Button>
        </div>
    )
}

export default ButtonBox