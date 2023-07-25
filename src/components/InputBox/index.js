import { TextField } from '@mui/material'
import React from 'react'

const InputBox = (props) => {
    const {name,label,value,onChange,error,helperText,placeholder} = props;
  return (
<>
<TextField
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        margin="normal"
        required
        error={error}
        helperText={helperText}
      />
      
<div></div>
</>
  )
}


export default InputBox