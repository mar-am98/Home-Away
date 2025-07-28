'use client'
import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import Image from 'next/image'
import Rating from './Rating'
import { RiDeleteBinLine } from "react-icons/ri";
import FormContainer from '../form/FormContainer';
import { deleteActionReview } from '@/utils/actions';
import { Button } from '../ui/button'
import IconButton from '../global/IconButton'

interface revProps{
  review:{
    id: string,
    comment: string,
    rating:number,
    authorName:string,
    authorImageUrl: string,
    property:{
      image: string,
      name: string
    }
  },

  showDelete?:boolean,
  imageType?: 'user' | 'property'
}


function ReviewCard({review,showDelete,imageType}:revProps) {
  const imgUrl = imageType === 'user' ? review.authorImageUrl : review.property.image;
  const imgAlt = imageType === 'user' ? review.authorName : review.property.name;
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4 relative">
          <Image src={imgUrl} alt={imgAlt} width={44} height={44} className='w-12 h-12 rounded-full capitalize my-1 object-cover' />
          <div>
            <h3 className='text-sm font-bold capitalize mb-1'>{review.authorName}</h3>
            <Rating rating={review.rating}/>
          </div>
          {
            showDelete && (
              <div className='absolute right-2' >
                <DeleteReview reviewId={review.id}/>
              </div>
            )
          }
        </div>
      </CardHeader>
      <CardContent>
        {review.comment}
      </CardContent>
    </Card>
  )
}

export default ReviewCard


function DeleteReview({reviewId}:{reviewId:string}){
  const revDelete = deleteActionReview.bind(null,{reviewId});

  return(
    <FormContainer action={revDelete}>
        <IconButton actionType='delete' />
    </FormContainer>
  )
}
