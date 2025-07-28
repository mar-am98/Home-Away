import { property } from '@prisma/client'
import React from 'react'
import PropertyRating from './PropertyRating'

interface DetailsProp{
  property: property,
  stats:{
    avg: number,
    count: number
  }
}

function StayDetails({property,stats}:DetailsProp) {
  const {name,guests,bedrooms,beds,baths} = property;
  return (
    <div className='py-4'>
        <div className='flex items-center gap-6'>
            <h3 className='text-xl font-bold'>{name}</h3>
            <PropertyRating showReview stats={stats} />
        </div>
        <div>
            <p className='text-base font-light flex items-center'>
                {bedrooms} bedrooms<span className="mx-2 text-xl">•</span>
                {baths} baths<span className="mx-2 text-xl">•</span>
                {guests} guests<span className="mx-2 text-xl">•</span>
                {beds} beds
            </p>
        </div>
    </div>
  )
}

export default StayDetails