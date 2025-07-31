'use client'

import React from 'react'
import { Button } from '../ui/button'
import { useFormStatus } from 'react-dom'
import { IoReload } from "react-icons/io5";
import { cn } from '@/lib/utils';


function FormButton({text,className}:{text:string,className?:string}) {
    const {pending} = useFormStatus();
  return (
    <Button type='submit' disabled={pending} className={cn('h-11 capitalize mt-8',className)}>
        {
            pending ? 
            (
              <>Please Wait <IoReload className='animate-spin [animation-duration:2s]'/></>
            ) :
            text
        }
    </Button>
  )
}

export default FormButton