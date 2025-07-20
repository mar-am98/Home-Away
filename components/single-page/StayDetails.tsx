import { property } from '@prisma/client'
import React from 'react'
import PropertyRating from './PropertyRating'

function StayDetails({property}:{property:property}) {
  return (
    <div className='py-4'>
        <div className='flex items-center gap-6'>
            <h3 className='text-xl font-bold'>{property.name}</h3>
            <PropertyRating showReview />
        </div>
        <div>
            <p className='text-base font-light flex items-center'>
                2 bedrooms<span className="mx-2 text-xl">•</span>
                2 baths<span className="mx-2 text-xl">•</span>
                2 guests<span className="mx-2 text-xl">•</span>
                2 beds
            </p>
        </div>
    </div>
  )
}

export default StayDetails