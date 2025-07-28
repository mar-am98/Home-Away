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

    const map = L.map('map').setView([lat, lng], 4)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map)

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
