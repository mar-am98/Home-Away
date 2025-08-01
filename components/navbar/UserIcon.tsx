'use client'

import { useUser } from '@clerk/nextjs';
import { LucideUserCircle2 } from 'lucide-react';
import React from 'react'

function UserIcon() {
  const {user} = useUser();
  const userImg = user?.imageUrl

    if(userImg){
        return (
            <div>
                <img src={userImg} alt="userImg" className='w-6 h-6 rounded-full object-cover'/>
            </div>
        )
    } 

    return <LucideUserCircle2 className="w-6 h-6" />

}

export default UserIcon