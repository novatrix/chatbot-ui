// 1. Import the 'useState' hook from React
import { useState } from "react"
import { IconPlus, IconClose } from "@/components/icons/search-engine-icons"

// 2. Define the 'ShoppingItem' interface based on the structure of the shopping data
interface ShoppingItem {
  title: string
  source: string
  link: string
  price: string
  delivery: string
  imageUrl: string
  rating: number
  ratingCount: number
  offers: string
  productId: string
  position: number
}

// 3. Define the 'ShoppingComponentProps' interface with a 'shopping' property of type 'ShoppingItem[]'
interface ShoppingComponentProps {
  shopping: ShoppingItem[]
}

// 4. Define the 'ShoppingComponent' functional component that takes 'shopping' as a prop
const ShoppingComponent: React.FC<ShoppingComponentProps> = ({ shopping }) => {
  console.log("shopping", shopping)
  // 5. Use the 'useState' hook to manage the 'showModal' state
  const [showModal, setShowModal] = useState(false)

  // 6. Define the 'ShoppingSkeleton' component to render a loading skeleton
  const ShoppingSkeleton = () => (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex items-center space-x-4">
          <div className="size-10 animate-pulse rounded-full bg-gray-300 dark:bg-gray-700"></div>
          <div className="grow">
            <div className="mb-2 h-4 w-2/3 animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
            <div className="h-4 w-1/2 animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
          </div>
        </div>
      ))}
    </>
  )

  // 7. Render the 'ShoppingComponent'
  return (
    <div className="mt-4 rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800">
      <div className="flex items-center">
        <h2 className="grow text-lg font-semibold text-gray-900 dark:text-gray-100">
          Shopping Results
        </h2>
        <IconPlus
          className="size-4 cursor-pointer text-gray-500 dark:text-gray-400"
          onClick={() => setShowModal(true)}
        />
      </div>
      <div className="mt-4">
        {shopping.length === 0 ? (
          <ShoppingSkeleton />
        ) : (
          shopping.slice(0, 3).map((item, index) => (
            <div key={index} className="mb-4 flex items-center space-x-4">
              <div className="size-10 shrink-0 overflow-hidden">
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="size-full rounded-full object-cover"
                  />
                </a>
              </div>
              <div className="grow">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-1 text-sm font-semibold text-gray-900 hover:underline dark:text-gray-100"
                >
                  {item.title}
                </a>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <span className="mr-1">{item.source}</span>
                  <span className="mr-1 text-yellow-500">
                    {"★".repeat(Math.floor(item.rating))}
                  </span>
                  <span>({item.ratingCount})</span>
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {item.price}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black opacity-10 transition-opacity"
            onClick={() => setShowModal(false)}
          ></div>
          <div className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-lg bg-white shadow-xl dark:bg-gray-800">
            <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-800">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Shopping Results
              </h2>
              <IconClose
                className="size-6 cursor-pointer text-gray-500 transition duration-150 ease-in-out hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                onClick={() => setShowModal(false)}
              />
            </div>
            <div className="max-h-[70vh] space-y-6 overflow-y-auto p-6">
              {shopping.map((item, index) => (
                <div key={index} className="flex items-center space-x-6">
                  <div className="size-24 shrink-0 overflow-hidden rounded">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="size-full object-cover"
                      />
                    </a>
                  </div>
                  <div className="grow">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mb-2 text-xl font-bold text-gray-900 hover:underline dark:text-gray-100"
                    >
                      {item.title}
                    </a>
                    <p className="mb-2 text-base text-gray-500 dark:text-gray-400">
                      {item.source}
                    </p>
                    <div className="mb-2 flex items-center">
                      <span className="mr-1 text-lg text-yellow-500">
                        {"★".repeat(Math.floor(item.rating))}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {item.ratingCount}
                      </span>
                    </div>
                    <p className="mb-2 text-lg font-bold text-gray-900 dark:text-gray-100">
                      {item.price}
                    </p>
                    {item.delivery && (
                      <p className="text-base text-gray-500 dark:text-gray-400">
                        {item.delivery}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShoppingComponent
