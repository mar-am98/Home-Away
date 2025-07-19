import React from 'react'
import { property } from '@prisma/client'
import Link from 'next/link'
import { pageLinks } from '@/utils/links'
import { fetchProperty } from '@/utils/actions'
import PropertyCard from './PropertyCard'


async function PropertiesContainer({search}:{search:string}){

  const properties:property[] = await fetchProperty({search});

  return (
    <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-12">
      {properties.length === 0 && ( <p className='capitalize text-lg font-bold w-100'>no results matched your search.</p>)}
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