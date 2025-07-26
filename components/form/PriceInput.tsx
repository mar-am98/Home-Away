import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

type PriceFormatProps = {
    name:string,
    defaultValue?: number
}

function PriceInput({name,defaultValue}:PriceFormatProps) {
  return (
    <div className='mb-2'>
        <Label htmlFor={name} className='mb-2'>
            Price $
        </Label>
        <Input id={name} type='number' name={name} min={0} defaultValue={defaultValue || 100} />
    </div>
  )
}

export default PriceInput