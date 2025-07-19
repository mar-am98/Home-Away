import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { LuAlignLeft } from 'react-icons/lu'
import { Button } from '../ui/button'
import { dropDownMenuLinks } from '@/utils/links'
import Link from 'next/link'

function DropDownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'outline'} className='flex gap-4 max-w-[100px]'>
          <LuAlignLeft /> 
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start' sideOffset={10} className='w-40'>
        {
          dropDownMenuLinks.map((page)=>(
            <DropdownMenuItem key={page.name}>
              <Link href={page.href}>
                {page.name}
              </Link>
            </DropdownMenuItem>
          ))
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DropDownMenu