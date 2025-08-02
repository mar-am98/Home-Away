import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { validateImageWithToast } from '@/utils/clientValidation'

function ImageInput({name}:{name:string}) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isValid = validateImageWithToast(file);
      if (!isValid) {
        // Clear the input if file is invalid
        e.target.value = '';
      }
    }
  };

  return (
    <div className='mb-2'>
        <Label htmlFor={name} className='mb-2'>Image</Label>
        <Input 
          id={name} 
          name={name} 
          type='file' 
          accept='image/*' 
          required 
          className='max-w-90'
          onChange={handleFileChange}
        />
    </div>
  )
}

export default ImageInput