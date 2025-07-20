
import React from 'react'
import { FaStar } from 'react-icons/fa';

function PropertyRating({showReview = false}:{showReview?:boolean}) {
  const rating = 4.5;
  const countReview = 30;
  const reviews = `(${countReview} Reviews)`
  return (
    <span className="flex gap-1 items-center">
        <FaStar className='w-3 h-3 text-amber-500' />
        {rating} {showReview && reviews}
    </span>
  )
}

export default PropertyRating