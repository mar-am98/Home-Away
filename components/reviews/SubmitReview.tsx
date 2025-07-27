import React from 'react'
import { Card } from '../ui/card'
import FormContainer from '../form/FormContainer'
import { createReviewAction } from '@/utils/actions'

function SubmitReview({id}:{id:string}) {
  
  return (
    <div>
      <Card className='p-8 mt-8'>
        <FormContainer action={createReviewAction}>
          <input type="hidden" name={id} />
        </FormContainer>
      </Card>
    </div>
  )
}

export default SubmitReview