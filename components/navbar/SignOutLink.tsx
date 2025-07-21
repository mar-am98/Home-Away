
'use client'

import { pageLinks } from '@/utils/links'
import { SignOutButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { toast } from 'sonner'

function logoutTost(){
    toast('You have been signed out.')
}

function SignOutLink() {
  return (
    <SignOutButton>
        <Link href={pageLinks.HOME.href} className='w-full' onClick={logoutTost} >
            Logout
        </Link>
    </SignOutButton>
  )
}

export default SignOutLink