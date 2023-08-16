import React from 'react';

import { TextField } from '@mui/material';

const InputBox = (props) => {
  const {
    sx,
    name,
    label,
    value,
    type,
    onChange,
    error,
    helperText,
    placeholder,
    className,
    disabled,
    defaultValue,
  } = props;
  return (
    <>
      <TextField
        sx={sx}
        name={name}
        label={label}
        value={value}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
        margin="normal"
        required
        error={error}
        helperText={helperText}
        disabled={disabled}
        defaultValue={defaultValue}
      />

      <div></div>
    </>
  );
};

export default InputBox;
