import { TextField } from '@mui/material'
import React from 'react'

const InputBox = (props) => {
    const {name,label,value,onChange,error,helperText} = props;
  return (
<>
<TextField
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        margin="normal"
        required
        error={error}
        helperText={helperText}
      />
</>
  )
}

export default InputBox