
import { fetchReviewStats } from '@/utils/actions';
import React from 'react'
import { FaStar } from 'react-icons/fa';

interface RateProp{
  showReview?:boolean,
  stats?:{
    avg: number,
    count: number
  }
}
function PropertyRating({showReview = false,stats}:RateProp) {

  if(!stats?.avg) return null

  const rating = stats?.avg.toFixed(1);
  const countReview = stats?.count || 0;


  const reviews = `(${countReview} Reviews)`
  return (
    <span className="flex gap-1 items-center">
        <FaStar className='w-3 h-3 text-amber-500' />
        {rating} {showReview && reviews}
    </span>
  )
}

export default PropertyRating