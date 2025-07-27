'use client'

import React from 'react'
import { Button } from '../ui/button'
import { pageLinks } from '@/utils/links'
import { useRouter } from 'next/navigation'

interface EmptyProp{
  heading: string,
  message: string,
  actionLabel: string
}

function EmptyState({heading,message,actionLabel}:EmptyProp) {
  const router = useRouter();
  return (
    <div>
        <h3 className='text-2xl font-bold capitalize mb-2'>{heading}</h3>
        <p className='text-lg w-120'>{message}</p>
        <Button className='mt-4 p-6 cursor-pointer capitalize text-base'
                onClick={()=>router.replace(pageLinks.HOME.href)}>
              {actionLabel}
        </Button>
    </div>
  )
}

export default EmptyState