// @ts-nocheck
"use client"
import React, { useState } from "react"
import { IconPlus, IconClose } from "@/components/icons/search-engine-icons"

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

const LocationSidebar = ({ places }: { places: Place[] }) => {
  const [showMore, setShowMore] = useState(false)
  // only show the first 5 places
  places = places.slice(0, 4)

  return (
    <div className="mt-4 rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800">
      <div className="flex items-center">
        <h2 className="grow text-lg font-semibold text-black dark:text-white">
          Location Details
        </h2>
        {places.length > 3 && (
          <div className="ml-2 flex justify-center">
            <button
              className="text-black focus:outline-none dark:text-white"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? <IconClose /> : <IconPlus />}
            </button>
          </div>
        )}
      </div>
      <div
        className={`space-y-4 transition-all duration-500 ${showMore ? "max-h-[5000px]" : "max-h-[300px]"} overflow-hidden`}
      >
        {places?.slice(0, showMore ? places.length : 3).map((place: Place) => (
          <div
            key={place.cid}
            className="rounded-lg bg-gray-100 p-4 dark:bg-gray-700"
          >
            <h3 className="mb-2 text-lg font-semibold">{place.title}</h3>
            <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
              {place.address}
            </p>
            <div className="mb-2 flex items-center">
              <span className="mr-1 text-sm text-gray-600 dark:text-gray-400">
                Rating:
              </span>
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`size-4 ${
                      index < Math.floor(place.rating)
                        ? "text-yellow-400"
                        : "text-gray-300 dark:text-gray-500"
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
            <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
              Category: {place.category}
            </p>
            {place.phoneNumber && (
              <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                Phone:{" "}
                <a
                  href={`tel:${place.phoneNumber}`}
                  className="text-blue-500 hover:underline"
                >
                  {place.phoneNumber}
                </a>
              </p>
            )}
            {place.website && (
              <p className="truncate text-sm text-gray-600 dark:text-gray-400">
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
        ))}
      </div>
    </div>
  )
}

export default LocationSidebar
