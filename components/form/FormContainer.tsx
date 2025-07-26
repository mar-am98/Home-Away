'use client'
import { actionFunction } from '@/utils/types'
import React, { useActionState, useEffect } from 'react'
import { toast } from 'sonner'

interface FormProps{
    children: React.ReactNode,
    action: actionFunction
}

const initialAction = {
    message:''
}

function FormContainer({children,action}:FormProps) {
    const [state,setAction] = useActionState(action,initialAction)

    useEffect(()=>{
      if(state.message){
        toast(state.message)
      }
    },[state])


  return (
    <form action={setAction}>
        {children}
    </form>
  )
}

export default FormContainer