import React from 'react';

import { Button } from '@mui/material';

const ButtonComponent = (props) => {
  const { fullWidth, color, onClick, title, sx, className } = props;
  return (
    <Button
      fullWidth={fullWidth}
      color={color}
      variant="contained"
      className={className}
      onClick={onClick}
      sx={sx}
    >
      {title}
    </Button>
  );
};

export default ButtonComponent;
