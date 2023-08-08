import { TextField } from '@mui/material'
import React from 'react'

const InputBox = (props) => {
    const {name,label,value,type,onChange,error,helperText,placeholder,className,disabled} = props;
  return (
<>
<TextField
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
      />
      
<div></div>
</>
  )
}


export default InputBox