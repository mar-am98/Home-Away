import React from 'react'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'

interface TextAreaProps{
  name:string,
  defaultValue?:string,
  placeholder?:string,
  label?:string
}

function TextAreaInput({name,defaultValue,placeholder,label}:TextAreaProps) {
  return (
    <div>
        <Label htmlFor={name} className='mb-2 capitalize'>{label || name}</Label>
        <Textarea id={name} name={name} placeholder={placeholder} defaultValue={defaultValue} rows={6} required className='leading-loose w-full min-h-30' />
    </div>
  )
}

export default TextAreaInput