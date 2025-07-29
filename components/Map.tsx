'use client'

import { useEffect } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

type Props = {
  lat: number
  lng: number
  zoom?: number
}

export default function Map({ lat, lng }: Props) {
  useEffect(() => {
    const mapContainer = document.getElementById('map')
    if (!mapContainer || mapContainer.innerHTML !== '') return

    const map = L.map('map').setView([lat, lng], 5)

    L.tileLayer(
      'https://cartodb-basemaps-a.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }
    ).addTo(map)

    const customIcon = L.icon({
      iconUrl: '/images/pinlocation.svg',
      iconSize: [35, 40],
      iconAnchor: [15, 50]
    })

        L.marker([lat, lng], { icon: customIcon })
      .addTo(map)

    return () => {
      map.remove()
    }
  }, [lat, lng])

  return (
    <div
      id="map"
      style={{ height: '400px', width: '100%' }}
      className="rounded-lg"
    />
  )
}
