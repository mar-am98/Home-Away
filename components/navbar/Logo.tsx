import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { pageLinks } from '@/utils/links'
import { TentIcon } from 'lucide-react'

function Logo() {
  return (
    <Button size={'icon'} asChild>
      <Link href={pageLinks.HOME.href}>
        <TentIcon />
      </Link>
    </Button>
  )
}

export default Logo