
import React from 'react'
import ReactCountryFlag from 'react-country-flag'
import countries from 'world-countries'
import MapLocation from '@/components/single-page/MapLocation';

function StayLocation({location}:{location:string}) {
  const country = countries.find(
    (current) => current.name.common.toLowerCase() === location.toLowerCase()
  )

  const lat = country ? country.latlng[0] : 0
  const lng = country ? country.latlng[1] : 0

  return (
    <div className='mt-12  h-fit'>
        <h3 className='text-lg font-bold my-3'>Where you will be staying</h3>
        <div className='flex items-center gap-2'>
            {country && (
                <ReactCountryFlag countryCode={country.cca2} 
                    svg style={{width: '1.5em', height: '1em', borderRadius: '2px',}}
                    title={country.name.common} />
            )}
            <p className='font-semibold'>{location}</p>
        </div>
        <MapLocation lat={lat} lng={lng}/>
    </div>
  )
}

export default StayLocation