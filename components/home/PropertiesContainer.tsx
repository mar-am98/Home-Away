import React from 'react'
import { property } from '@prisma/client'
import Link from 'next/link'
import { pageLinks } from '@/utils/links'
import { fetchProperty } from '@/utils/actions'
import PropertyCard from './PropertyCard'
import EmptyState from '../global/EmptyState'


async function PropertiesContainer({search,category}:{search:string,category:string}){

  const properties:property[] = await fetchProperty({search,category});

  return (
    <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-12">
      {properties.length === 0 && <EmptyState heading={'no results.'} message='Try changing or removing some of your filters.' actionLabel='clear filters' />}
      {properties.map((property)=>{
        return(
          <Link href={`${pageLinks.PROPERTIES.href}/${property.id}`} key={property.id}>
            <PropertyCard property={property} />
          </Link>
        )
      })}
    </section>
  )
}

export default PropertiesContainer