import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

interface InputProps{
    name: string,
    type: string,
    label?: string,
    defaultValue?: string,
    placeholder?: string,
}


function InputForm({name,type,label,defaultValue,placeholder}:InputProps) {
  return (
    <div className="mb-2">
        <Label htmlFor={name} className='capitalize mb-2'>{label || name}</Label>
        <Input name={name} id={name}  type={type} defaultValue={defaultValue} placeholder={placeholder} required />
    </div>
  )
}

export default InputForm