'use client'
import React, { useState } from 'react'
import { Card } from '../ui/card'
import FormContainer from '../form/FormContainer'
import { createReviewAction } from '@/utils/actions'
import { useUser } from '@clerk/nextjs'
import RatingInput from './RatingInput'
import TextAreaInput from '../form/TextAreaInput'
import FormButton from '../form/FormButton'
import { Button } from '../ui/button'

function SubmitReview({id}:{id:string}) {
  const {user} = useUser();
  const [show,setShow] = useState(false);

  return (
      <div className='my-10'>
            <Button onClick={()=>setShow((prev)=>!prev)} >
              Leave a Review
            </Button>
            {
              show && (
                        <Card className='p-8 my-10'>
                          <FormContainer action={createReviewAction}>
                            <input type="hidden" name={'propertyID'} value={id} />
                            <input type="hidden" name={'authorName'} value={user?.firstName || '' } />
                            <input type="hidden" name={'authorImageUrl'} value={user?.imageUrl || '' } />


                            <RatingInput name='rating' />
                            <TextAreaInput name='comment' label='FeedBack' placeholder='Add comment..' defaultValue='Amazing Place!!!' />
                            <FormButton text='submit' />
                          </FormContainer>
                        </Card>
                      )
            }
      </div>
  )
}

export default SubmitReview