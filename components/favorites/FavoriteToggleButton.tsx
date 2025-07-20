import React from 'react'
import { Button } from '../ui/button'
import { FaHeart } from 'react-icons/fa'
import { MdFavorite } from 'react-icons/md'
import { cn } from '@/lib/utils'

function FavoriteToggleButton({className}:{className?:string}) {
  return (
    <Button size={'icon'} variant={'outline'} className={cn('cursor-pointer',className)}>
        <MdFavorite />
    </Button>
  )
}

export default FavoriteToggleButton