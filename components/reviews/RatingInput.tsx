import React from 'react'
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface RateProp{
  name: string,
  textLabel?: string
}


function RatingInput({name,textLabel}:RateProp){

  const num = Array.from({length:5},(_,i)=>{
    const value = i + 1;
    return value.toString();
  }).reverse()

  return (
    <div className="mb-2 max-w-sm">
      <Label className='mb-2 capitalize'>
        {textLabel || name}
      </Label>
      <Select defaultValue={num[0]} name={name} required>
        <SelectTrigger className='min-w-100'>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {
            num.map((number)=>(
              <SelectItem value={number} key={number} >
                {number}
              </SelectItem>
            ))
          }
        </SelectContent>
      </Select>
    </div>
  )
}

export default RatingInput