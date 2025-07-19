import React from 'react'
import { Button } from '../ui/button'

function EmptyList() {
  return (
    <div>
        <h3 className='text-xl font-bold'>No items in the list.</h3>
        <p className='text-lg'>Keep exploring our properties</p>
        <Button className='mt-4 py-6 px-8 cursor-pointer'>
            Back Home
        </Button>
    </div>
  )
}

export default EmptyList