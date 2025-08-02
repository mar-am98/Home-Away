import { SignInButton } from '@clerk/nextjs'
import React from 'react'
import { Button } from '../ui/button'
import { MdFavorite } from 'react-icons/md'

function CardSignButton() {
  return (
    <SignInButton mode='modal'>
        <Button size={'icon'} variant={'outline'} className='cursor-pointer'>
            <MdFavorite />
        </Button>
    </SignInButton>
  )
}

export default CardSignButton