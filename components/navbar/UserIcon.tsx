import { currentUser } from '@clerk/nextjs/server'
import { LucideUserCircle2 } from 'lucide-react';
import React from 'react'

async function UserIcon() {
  const profile = await currentUser();
  const userImg = profile?.imageUrl

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