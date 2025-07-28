'use client';

import { LucideEdit } from 'lucide-react';
import React from 'react'
import { LuTrash2 } from 'react-icons/lu';
import { Button } from '../ui/button';
import { useFormStatus } from 'react-dom';
import { ReloadIcon } from '@radix-ui/react-icons';

type actionTypeProps = 'edit' | 'delete';

function IconButton({actionType}:{actionType:actionTypeProps}) {
    const {pending} = useFormStatus();
    const renderIcon = ()=> {
        switch(actionType){
            case 'edit':
                return <LucideEdit />
            
            case 'delete':
                return <LuTrash2 />    
             
            default: 
            const never:never = actionType;   
            throw new Error(`invalid Action Type : ${never}`) 
        }
    }

  return (
    <Button
    type='submit'
    size={'icon'}
    variant={'link'}
    className='p-2 cursor-pointer'
        >

          {pending ? <ReloadIcon className='animate-spin' /> : renderIcon()}  

    </Button>
  )
}

export default IconButton