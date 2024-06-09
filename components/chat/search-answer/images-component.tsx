// 1. Import the 'useState' hook from React
import { useState } from "react"
import { IconPlus, IconClose } from "@/components/icons/search-engine-icons"

// 2. Define the 'Image' interface with a required 'link' property and an optional 'alt' property
interface Image {
  link: string
  alt?: string
}

// 3. Define the 'ImagesComponentProps' interface with an 'images' property of type 'Image[]'
interface ImagesComponentProps {
  images: Image[]
}

// 4. Define the 'ImagesComponent' functional component that takes 'images' as a prop
const ImagesComponent: React.FC<ImagesComponentProps> = ({ images }) => {
  // 5. Use the 'useState' hook to manage the 'showMore' and 'selectedImage' state
  const [showMore, setShowMore] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  // 6. Define the 'ImagesSkeleton' component to render a loading skeleton
  const ImagesSkeleton = () => (
    <>
      {Array.from({ length: showMore ? 9 : 3 }).map((_, index) => (
        <div key={index} className="w-1/3 p-1">
          <div className="aspect-square w-full overflow-hidden">
            <div className="size-full animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
          </div>
        </div>
      ))}
      {/* <div className="flex justify-center mt-4 w-full">
                <div className="bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse py-5 px-15 " style={{ height: '24px', width: '85px' }}></div>
            </div> */}
    </>
  )

  // 7. Define the 'handleImageClick' function to set the 'selectedImage' state
  const handleImageClick = (link: string) => {
    setSelectedImage(link)
  }

  // 8. Define the 'handleCloseModal' function to close the modal when clicking outside
  const handleCloseModal = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setSelectedImage(null)
    }
  }

  // 9. Render the 'ImagesComponent'
  return (
    <div className="mt-4 rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800">
      <div className="flex items-center">
        <h2 className="grow text-lg font-semibold text-black dark:text-white">
          Images
        </h2>
        {/* <img src="./brave.png" alt="brave logo" className="w-6 h-6" /> */}
        {images.length > 3 && (
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
        className={`mx-1 flex flex-wrap transition-all duration-500 ${showMore ? "max-h-[500px]" : "max-h-[200px]"} overflow-hidden`}
      >
        {images.length === 0 ? (
          // 10. Render the 'ImagesSkeleton' if there are no images
          <ImagesSkeleton />
        ) : (
          // 11. Render the images with a hover effect and click handler
          images.slice(0, showMore ? 9 : 3).map((image, index) => (
            <div
              key={index}
              className="w-1/3 cursor-pointer p-1 transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-105"
              onClick={() => handleImageClick(image.link)}
            >
              <div className="aspect-square w-full overflow-hidden">
                <img
                  src={image.link}
                  alt={image.alt || `Image ${index}`}
                  className="size-full object-cover"
                />
              </div>
            </div>
          ))
        )}
      </div>

      {selectedImage && (
        // 13. Render a modal with the selected image if 'selectedImage' is not null
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={handleCloseModal}
        >
          <div className="max-h-full max-w-5xl">
            <img
              src={selectedImage}
              alt="Full size"
              className="max-h-full max-w-full"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default ImagesComponent
