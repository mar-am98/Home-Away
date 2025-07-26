import React from 'react'
import { Label } from '../ui/label'
import { Checkbox } from '../ui/checkbox'

interface CheckBoxProps{
    name: string,
    label: string,
    defaultchecked?: boolean
}

function CheckBoxInput({name,label,defaultchecked=false}:CheckBoxProps) {
  return (
    <div className='flex items-center h-6 gap-2'>
        <Checkbox id={name} name={name} defaultChecked={defaultchecked} />
        <Label htmlFor={name} className='text-base leading-none capitalize'>{label}</Label>
    </div>
  )
}

export default CheckBoxInput