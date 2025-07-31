'use client'
import { pageLinks } from '@/utils/links'
import { actionFunction } from '@/utils/types'
import { useRouter } from 'next/navigation'
import React, { use, useActionState, useEffect, useTransition } from 'react'
import { toast } from 'sonner'

interface FormProps{
    children: React.ReactNode,
    action: actionFunction
}

const initialAction = {
    message:''
}

function FormContainer({children,action}:FormProps) {
    const [state,setAction] = useActionState(action,initialAction);

    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    useEffect(()=>{
      if(state.message === 'redirect'){
        router.push(pageLinks.BOOKINGS.href)
      }
      else if(state.message){
        toast(state.message)
      }

      startTransition(()=>{
        setTimeout(()=>{
          router.refresh();
        },0)
      });
      
    },[state])


  return (
    <form action={setAction}>
        {children}
    </form>
  )
}

export default FormContainer