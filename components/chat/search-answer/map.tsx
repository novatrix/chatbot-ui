"use client"
import React, { useRef } from "react"
import "leaflet/dist/leaflet.css"
import dynamic from "next/dynamic"

import L from "leaflet"
const MapContainer = dynamic(
  () => import("react-leaflet").then(mod => mod.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(
  () => import("react-leaflet").then(mod => mod.TileLayer),
  { ssr: false }
)
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), {
  ssr: false
})
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), {
  ssr: false
})

interface Place {
  cid: React.Key | null | undefined
  latitude: number
  longitude: number
  title: string
  address: string
  rating: number
  category: string
  phoneNumber?: string
  website?: string
}

const Map = ({ places }: { places: Place[] }) => {
  const customIcon = L.icon({
    iconUrl:
      "https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  })
  const mapRef = useRef<L.Map | null>(null)

  const center =
    places.length > 0
      ? [
          places.reduce(
            (acc, place) => acc + place.latitude / places.length,
            0
          ),
          places.reduce(
            (acc, place) => acc + place.longitude / places.length,
            0
          )
        ]
      : [0, 0]

  return (
    <div className={`mt-4 rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800 `}>
      <div className="flex items-center">
        <h2 className="grow text-lg font-semibold text-black dark:text-white">
          Locations
        </h2>
      </div>
      <div className={`mt-4`}>
        <MapContainer
          // @ts-ignore
          center={center}
          zoom={13}
          style={{ height: "400px" }}
          attributionControl={false}
          className="overflow-hidden rounded-lg"
          zoomControl={false}
          ref={mapRef}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {places.map((place: Place) => (
            <Marker
              key={place.cid}
              position={[place.latitude, place.longitude]}
              icon={customIcon}
            >
              <Popup>
                <div className="rounded-lg bg-white">
                  <h3 className="mb-1 text-lg font-semibold">{place.title}</h3>
                  <p className="mb-1 text-sm text-gray-600">{place.address}</p>
                  <div className="mb-1 flex items-center">
                    <span className="mr-1 text-sm text-gray-600">Rating:</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, index) => (
                        <svg
                          key={index}
                          className={`size-4 ${
                            index < Math.floor(place.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 15.585l-5.293 2.776.1-5.867L.416 8.222l5.875-.855L10 2.415l3.709 4.952 5.875.855-4.391 4.272.1 5.867L10 15.585z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="mb-1 text-sm text-gray-600">
                    Category: {place.category}
                  </p>
                  {place.phoneNumber && (
                    <p className="mb-1 text-sm text-gray-600">
                      Phone: {place.phoneNumber}
                    </p>
                  )}
                  {place.website && (
                    <p className="text-sm text-gray-600">
                      Website:{" "}
                      <a
                        href={place.website}
                        className="text-blue-500 hover:underline"
                      >
                        {place.website}
                      </a>
                    </p>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  )
}

const DynamicMap = dynamic(() => Promise.resolve(Map), { ssr: false })

export default DynamicMap
