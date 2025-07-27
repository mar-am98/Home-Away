'use client'
import React from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from '../ui/button'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { Loader2 } from 'lucide-react'

function CardSubmitButton({isFav}:{isFav:boolean}) {
    const {pending} = useFormStatus()
  return (
    <Button type='submit' size={'icon'} variant={'outline'} className='cursor-pointer'>
        {
            pending 
                    ? <Loader2 className='animate-spin w-3 h-3' />
                    : isFav ? <FaHeart className='text-primary'/> : <FaRegHeart />
        }
    </Button>
  )
}

export default CardSubmitButton