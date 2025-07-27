import { SignInButton } from '@clerk/nextjs'
import React from 'react'
import { Button } from '../ui/button'
import { MdFavorite } from 'react-icons/md'

function CardSignButton() {
  return (
    <SignInButton mode='modal'>
        <Button size={'icon'} variant={'outline'} className='cursor-pointer absolute right-2 top-2'>
            <MdFavorite />
        </Button>
    </SignInButton>
  )
}

export default CardSignButton