// 1. Import the necessary hooks from the 'react' library
import { useState, useEffect } from "react"
import { IconPlus, IconClose } from "@/components/icons/search-engine-icons"
// 2. Define the 'Video' interface to represent a video object
interface Video {
  link: string
  imageUrl: string
}
// 3. Define the 'VideosComponentProps' interface to specify the props for the 'VideosComponent'
interface VideosComponentProps {
  videos: Video[]
}
// 4. Define the 'VideosComponent' functional component that accepts 'VideosComponentProps'
const VideosComponent: React.FC<VideosComponentProps> = ({ videos }) => {
  // 5. Declare state variables using the 'useState' hook
  const [showMore, setShowMore] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [loadedImages, setLoadedImages] = useState<boolean[]>([])
  const [isFullScreen, setIsFullScreen] = useState(false)
  // 6. Use the 'useEffect' hook to initialize the 'loadedImages' state based on the number of videos
  useEffect(() => {
    setLoadedImages(Array(videos.length).fill(false))
  }, [videos])
  // 7. Define the 'handleImageLoad' function to update the 'loadedImages' state when an image is loaded
  const handleImageLoad = (index: number) => {
    setLoadedImages(prevLoadedImages => {
      const updatedLoadedImages = [...prevLoadedImages]
      updatedLoadedImages[index] = true
      return updatedLoadedImages
    })
  }
  // 8. Define the 'handleVideoClick' function to set the 'selectedVideo' state when a video is clicked
  const handleVideoClick = (link: string) => {
    setSelectedVideo(link)
  }
  // 9. Define the 'handleCloseModal' function to close the video modal and exit full-screen mode
  const handleCloseModal = () => {
    setSelectedVideo(null)
    setIsFullScreen(false)
  }
  // 10. Define the 'toggleFullScreen' function to toggle the full-screen mode
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen)
  }
  // 11. Define the 'VideosSkeleton' component to display a loading skeleton while videos are loading
  const VideosSkeleton = () => (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="w-1/3 p-1">
          <div className="aspect-video w-full overflow-hidden">
            <div className="h-24 w-full animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
          </div>
        </div>
      ))}
    </>
  )
  // 12. Render the 'VideosComponent' JSX
  return (
    <div className="mt-4 w-full rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800">
      {/* 13. Render the header with the "Videos" title and the Serper logo */}
      <div className="flex items-center">
        <h2 className="grow text-lg font-semibold text-black dark:text-white">
          Videos
        </h2>
        {/* <img src="./serper.png" alt="serper logo" className="w-6 h-6" /> */}
        {videos.length > 3 && (
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
      {/* 14. Render the video thumbnails */}
      <div
        className={`mx-1 flex w-full flex-wrap transition-all duration-500 ${showMore ? "max-h-[500px]" : "max-h-[200px]"} overflow-hidden`}
      >
        {videos.length === 0 ? (
          <VideosSkeleton />
        ) : (
          videos.slice(0, showMore ? 9 : 3).map((video, index) => (
            <div
              key={index}
              className="w-1/3 cursor-pointer p-1 transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-110"
              onClick={() => handleVideoClick(video.link)}
            >
              {!loadedImages[index] && (
                <div className="aspect-video w-full overflow-hidden">
                  <div className="h-24 w-full animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
                </div>
              )}
              <div className="aspect-video w-full overflow-hidden transition-all duration-200">
                <img
                  src={video.imageUrl}
                  alt={`Video ${index}`}
                  className={`h-auto w-full rounded-lg transition-all duration-200 ${loadedImages[index] ? "block" : "hidden"}`}
                  onLoad={() => handleImageLoad(index)}
                />
              </div>
            </div>
          ))
        )}
      </div>
      {/* 15. Render the video modal when a video is selected */}
      {selectedVideo && (
        <div
          className={`fixed ${isFullScreen ? "inset-0" : "bottom-2 right-2 md:bottom-2 md:right-2"} z-50 ${
            isFullScreen
              ? "size-full"
              : "h-1/4 w-full md:h-1/4 md:w-1/2 lg:w-1/4"
          } flex items-center justify-center rounded-lg border-4 border-white bg-black bg-opacity-75 shadow-lg transition-all duration-300`}
        >
          <div className="relative size-full">
            {/* 16. Render the YouTube video iframe */}
            <iframe
              src={`https://www.youtube.com/embed/${getYouTubeVideoId(selectedVideo)}?autoplay=1`}
              title="YouTube Video"
              allowFullScreen
              className="size-full rounded-lg"
              allow="autoplay"
            ></iframe>
            {/* 17. Render the close button for the video modal */}
            <button
              className="absolute right-2 top-2 rounded-full bg-white p-2 text-black hover:bg-gray-200 focus:outline-none"
              onClick={handleCloseModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {/* 18. Render the full-screen toggle button */}
            <button
              className="absolute bottom-2 right-2 rounded-full bg-white p-2 text-black hover:bg-gray-200 focus:outline-none"
              onClick={toggleFullScreen}
            >
              {isFullScreen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
// 19. Define the 'getYouTubeVideoId' function to extract the YouTube video ID from a URL
const getYouTubeVideoId = (url: string) => {
  const match = url.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(?:embed\/)?(?:v\/)?(?:shorts\/)?(?:\S+)/
  )
  return match ? match[0].split("/").pop()?.split("=").pop() : ""
}
export default VideosComponent
