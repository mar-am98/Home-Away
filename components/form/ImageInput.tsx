import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

function ImageInput({name}:{name:string}) {
  return (
    <div className='mb-2'>
        <Label htmlFor={name} className='mb-2'>Image</Label>
        <Input id={name} name={name} type='file' accept='image/*' required className='max-w-90'/>
    </div>
  )
}

export default ImageInput