'use client'

import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { LuAlignLeft } from 'react-icons/lu'
import { Button } from '../ui/button'
import { dropDownMenuLinks } from '@/utils/links'
import Link from 'next/link'
import SignOutLink from './SignOutLink'
import UserIcon from './UserIcon'
import { SignedIn, SignedOut, SignIn, SignInButton, SignUpButton } from '@clerk/nextjs'

function DropDownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'outline'} className='flex gap-4 max-w-[100px]'>
          <LuAlignLeft /> 
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start' sideOffset={10} className='w-40'>
        
        <SignedOut>
          <DropdownMenuItem>
            <SignInButton mode='modal'>
              Sign In
            </SignInButton>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignUpButton mode='modal'>
              Register
            </SignUpButton>
          </DropdownMenuItem>
        </SignedOut>

        <SignedIn>
          {
            dropDownMenuLinks.map((page)=>(
              <DropdownMenuItem key={page.name} asChild>
                <Link href={page.href}>
                  {page.name}
                </Link>
              </DropdownMenuItem>
            ))
          }

          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutLink />
          </DropdownMenuItem>
        </SignedIn>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DropDownMenu