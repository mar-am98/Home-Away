'use client'

import React from 'react'
import { Button } from '../ui/button'
import { useFormStatus } from 'react-dom'
import { IoReload } from "react-icons/io5";


function FormButton({text}:{text:string}) {
    const {pending} = useFormStatus();
  return (
    <Button type='submit' disabled={pending} className='max-w-40 h-11 capitalize mt-8'>
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