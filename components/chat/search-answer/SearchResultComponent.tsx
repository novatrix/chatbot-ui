import { useState, useEffect } from "react"

export interface SearchResult {
  favicon: string
  link: string
  title: string
}

export interface SearchResultsComponentProps {
  searchResults: SearchResult[]
}

// 4. Define the 'SearchResultsComponent' functional component that takes 'searchResults' as a prop
const SearchResultsComponent = ({
  searchResults
}: {
  searchResults: SearchResult[]
}) => {
  // 5. Use the 'useState' hook to manage the 'isExpanded' and 'loadedFavicons' state
  const [isExpanded, setIsExpanded] = useState(false)
  const [loadedFavicons, setLoadedFavicons] = useState<boolean[]>([])

  // 6. Use the 'useEffect' hook to initialize the 'loadedFavicons' state based on the 'searchResults' length
  useEffect(() => {
    setLoadedFavicons(Array(searchResults.length).fill(false))
  }, [searchResults])

  // 7. Define the 'toggleExpansion' function to toggle the 'isExpanded' state
  const toggleExpansion = () => setIsExpanded(!isExpanded)

  // 8. Define the 'visibleResults' variable to hold the search results to be displayed based on the 'isExpanded' state
  const visibleResults = isExpanded ? searchResults : searchResults.slice(0, 3)

  // 9. Define the 'handleFaviconLoad' function to update the 'loadedFavicons' state when a favicon is loaded
  const handleFaviconLoad = (index: number) => {
    setLoadedFavicons(prevLoadedFavicons => {
      const updatedLoadedFavicons = [...prevLoadedFavicons]
      updatedLoadedFavicons[index] = true
      return updatedLoadedFavicons
    })
  }

  // 10. Define the 'SearchResultsSkeleton' component to render a loading skeleton
  const SearchResultsSkeleton = () => (
    <>
      {Array.from({ length: isExpanded ? searchResults.length : 3 }).map(
        (_, index) => (
          <div
            key={`skeleton-${index}`}
            className="w-full p-2 sm:w-1/2 md:w-1/4"
          >
            <div className="flex h-full items-center space-x-2 rounded-lg bg-gray-100 p-3 dark:bg-slate-700">
              {searchResults[index]?.favicon.length > 0 && (
                <div className="size-5 animate-pulse rounded bg-gray-400 dark:bg-slate-600"></div>
              )}
              <div className="h-4 w-full animate-pulse rounded bg-gray-400 dark:bg-slate-600"></div>
            </div>
          </div>
        )
      )}
      {/* Add a skeleton for the "View more" button */}
      <div className="w-full p-2 sm:w-full md:w-1/4">
        <div className="flex h-12 items-center justify-center space-x-2 rounded-lg bg-gray-100 p-3 dark:bg-slate-700">
          <div className="size-5 animate-pulse rounded bg-gray-400 dark:bg-slate-600"></div>
          <div className="size-5 animate-pulse rounded bg-gray-400 dark:bg-slate-600"></div>
          <div className="size-5 animate-pulse rounded bg-gray-400 dark:bg-slate-600"></div>
          <div className="h-4 w-full animate-pulse rounded bg-gray-400 dark:bg-slate-600"></div>
        </div>
      </div>
    </>
  )

  // 11. Render the 'SearchResultsComponent'
  return (
    <div className="mt-4 rounded-lg bg-white p-4 shadow-lg dark:bg-slate-800">
      <div className="flex items-center">
        <h2 className="grow text-lg font-semibold text-black dark:text-white">
          Sources
        </h2>
      </div>
      <div className="my-2 flex flex-wrap">
        {searchResults.length === 0 ? (
          // 12. Render the 'SearchResultsSkeleton' if there are no search results
          <SearchResultsSkeleton />
        ) : (
          <>
            {/* 13. Render the search results with favicon, title, and link */}
            {visibleResults.map((result, index) => (
              <div
                key={`searchResult-${index}`}
                className="w-full p-2 md:w-1/4"
              >
                <div className="flex h-full items-center space-x-2 rounded-lg bg-gray-100 p-3 dark:bg-slate-700">
                  {result.favicon.length > 0 && !loadedFavicons[index] && (
                    <div className="size-5 animate-pulse rounded bg-gray-400 dark:bg-slate-600"></div>
                  )}
                  {result.favicon.length > 0 && (
                    <img
                      src={result.favicon}
                      alt="favicon"
                      className={`size-5 ${loadedFavicons[index] ? "block" : "hidden"}`}
                      onLoad={() => handleFaviconLoad(index)}
                    />
                  )}
                  <a
                    href={result.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate text-sm font-semibold text-gray-700 hover:text-black dark:text-gray-200 dark:hover:text-white"
                  >
                    {result.title}
                  </a>
                </div>
              </div>
            ))}
            {/* 14. Render a button to toggle the expansion of search results */}
            <div className="w-full p-2 sm:w-full md:w-1/4">
              <div
                onClick={toggleExpansion}
                className="flex h-12 cursor-pointer items-center justify-center space-x-2 rounded-lg bg-gray-100 p-3 dark:bg-slate-700"
              >
                {!isExpanded ? (
                  <>
                    {searchResults
                      .slice(0, 3)
                      .map((result, index) =>
                        result.favicon.length ? (
                          <img
                            key={`favicon-${index}`}
                            src={result.favicon}
                            alt="favicon"
                            className="size-4"
                          />
                        ) : null
                      )}
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                      View more
                    </span>
                  </>
                ) : (
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Show Less
                  </span>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default SearchResultsComponent
