import React from 'react'
import ReviewCard from './ReviewCard'
import { fetchPropertyReviews } from '@/utils/actions'

async function PropertyReviews({id}:{id:string}) {
  const reviews = await fetchPropertyReviews(id);
  return (
    <div className='my-8 mt-10'>
      {
        reviews.length > 0 && (
          <>
            <h3 className='text-xl font-bold mb-4'>Reviews</h3>
            <div className='grid md:grid-cols-2 gap-10'>
              {
                reviews.map((review)=>{
                  const {comment,rating,authorName,authorImageUrl,id,} = review
                  const revs ={
                    comment,
                    rating,
                    authorName,
                    authorImageUrl,
                    id,
                    property: review.property
                  }
                  return <ReviewCard key={review.id} review={revs} imageType={'user'} />
                })
              }
            </div>
          </>
        )
      }
    </div>
  )
}

export default PropertyReviews