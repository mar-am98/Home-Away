import { AmenitiesArray } from '@/utils/AmenityArray'
import React from 'react'

function PlaceOffer({amenities}:{amenities:string[]}) {
  return (
    <div className='my-8'>
      <h3 className='text-lg font-bold my-3'>What this place offers</h3>
      <div className='grid sm:grid-cols-2 gap-4 mt-4'>
          {amenities.map((checkbox)=>{
              const amenity = AmenitiesArray.find((item) => item.label === checkbox)
              if (!amenity) return null 
              const Icon = amenity.icon
              return(
                  <p key={checkbox} className='flex items-center gap-4 capitalize text-base font-normal'><span className='text-lg text-primary/80'><Icon /></span>{checkbox}</p>
              )
          })}
      </div>
    </div>
  )
}

export default PlaceOffer