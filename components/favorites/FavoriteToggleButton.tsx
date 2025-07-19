import React from 'react'
import { Button } from '../ui/button'
import { FaHeart } from 'react-icons/fa'
import { MdFavorite } from 'react-icons/md'

function FavoriteToggleButton() {
  return (
    <Button size={'icon'} variant={'outline'} className='top-2 right-2 absolute cursor-pointer'>
        <MdFavorite />
    </Button>
  )
}

export default FavoriteToggleButton