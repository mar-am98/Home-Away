import EmptyState from '@/components/global/EmptyState';
import ReviewCard from '@/components/reviews/ReviewCard';
import { fetchUserReviews } from '@/utils/actions';
import React from 'react'


async function ReviewsPage() {
  const reviews = await fetchUserReviews();

  if(reviews.length === 0){
    return(
      <div className="mt-12">
        <EmptyState heading='No items in the list.' message='Keep exploring our properties' actionLabel='back home' />
      </div>
    )
  }
  
    return (
    <div className='mt-12'>
      <h3 className='capitalize text-xl font-bold mb-2'>your reviews</h3>
      <div className='grid md:grid-cols-2 gap-10 my-6'>
        {
          reviews.map((rev)=>(
            <ReviewCard review={rev} key={rev.id} showDelete imageType={'property'} />
          ))
        }
      </div>
    </div>
  )
}

export default ReviewsPage
