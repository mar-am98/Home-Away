'use client'
import { pageLinks } from '@/utils/links'
import { actionFunction } from '@/utils/types'
import { useRouter } from 'next/navigation'
import React, { use, useActionState, useEffect, useTransition } from 'react'
import { toast } from 'sonner'
import { validateFileSize } from '@/utils/fileValidation'

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

    const handleSubmit = (formData: FormData) => {
      // Check for file inputs and validate size before submission
      const imageFile = formData.get('image') as File;
      if (imageFile && imageFile.size > 0) {
        const { isValid } = validateFileSize(imageFile);
        if (!isValid) {
          toast.error('Please select a smaller image file before submitting');
          return;
        }
      }
      
      // If validation passes, submit the form
      setAction(formData);
    };

  return (
    <form action={handleSubmit}>
        {children}
    </form>
  )
}

export default FormContainer