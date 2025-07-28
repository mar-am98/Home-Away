'use client'

import React from 'react'
import dynamic from 'next/dynamic'

const Map = dynamic(() => import('@/components/Map'), { ssr: false })

function MapLocation({ lat, lng }:{lat:number,lng:number}) {
  return (
    <div>
      <div className="mt-6">
        <Map lat={lat} lng={lng} />
      </div>
    </div>
  )
}

export default MapLocation