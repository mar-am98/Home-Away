import { property } from '@prisma/client'
import React from 'react'
import ReactCountryFlag from 'react-country-flag'
import countries from 'world-countries'

function StayLocation({property}:{property:property}) {
  const country = countries.find(
    (current) => current.name.common.toLowerCase() === property.location.toLowerCase()
  )
  return (
    <div className='my-8'>
        {/* <h3 className='text-lg font-bold my-3'>Where you will be staying</h3> */}
        <div className='flex items-center gap-2'>
            {country && (
                <ReactCountryFlag countryCode={country.cca2} 
                    svg style={{width: '1.5em', height: '1em', borderRadius: '2px',}}
                    title={country.name.common} />
            )}
            <p className='font-semibold'>{property.location}</p>
        </div>
    </div>
  )
}

export default StayLocation