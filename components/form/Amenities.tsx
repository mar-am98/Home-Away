import { AmenitiesArray } from '@/utils/AmenityArray'
import React from 'react'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'

function Amenities({defaultValue}:{defaultValue?:string[]}) {
  return (
    <div className='mt-10 mb-6 px-4'>
        <h3 className='text-lg font-medium mb-6'>Amenities</h3>
        <div className='grid sm:grid-cols-2 gap-4'>
            {
                AmenitiesArray.map((item)=>{
                    const Icon = item.icon
                    return(
                        <div className='flex items-center gap-4' key={item.label}>
                            <Checkbox id={item.label} name='amenities' value={item.label} className='border-primary' defaultChecked={defaultValue?.includes(item.label)} />
                            <Label htmlFor={item.label} className='text-base mr-2'>
                                {item.label}
                                <Icon />
                            </Label>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Amenities