import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { pageLinks } from '@/utils/links'

function CrumbBread({name}:{name:string}) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href={pageLinks.HOME.href} className='text-base capitalize'>{pageLinks.HOME.name}</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator />
        
        <BreadcrumbItem>
          <BreadcrumbPage className='text-base capitalize'>{name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default CrumbBread