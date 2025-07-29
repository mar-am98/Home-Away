
import Image from 'next/image'
import React from 'react'

function UserDetails({userName,userImg}:{userName: string, userImg: string}) {
  return (
    <div className='flex gap-4 items-center mb-6'>
        <div className='relative h-12 w-12'>
            <Image 
                src={userImg}
                fill
                className='object-cover rounded'
                alt='prof-img'
                priority
            />
        </div>
        <div>
            <p className='text-lg'>Hosted by <span className='capitalize font-bold'>{userName}</span></p>
            <p className='text-base text-muted-foreground font-medium'>
                Superhost - 2 Years hosting
            </p>
        </div>
    </div>
  )
}

export default UserDetails