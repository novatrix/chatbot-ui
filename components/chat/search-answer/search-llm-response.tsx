import React, { useState } from "react"
// 0. Import the 'useActions' hook from the 'use-actions' package
import { type AI } from "@/app/actions"
import { useActions } from "ai/rsc"

// 1. Define the 'LLMResponseComponentProps' interface with properties for 'llmResponse', 'currentLlmResponse', 'index', and 'semanticCacheKey'
interface LLMResponseComponentProps {
  llmResponse: string
  currentLlmResponse: string
  index: number
  semanticCacheKey: string
}

// 2. Import the 'Markdown' component from 'react-markdown'
import Markdown from "react-markdown"

// Modal component to display the fade-out message
const Modal = ({
  message,
  onClose
}: {
  message: string
  onClose: () => void
}) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 3000) // Close modal after 3 seconds
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed right-0 top-0 z-50 mr-4 mt-4 w-full max-w-sm rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800">
      <div className="flex items-center">
        <h2 className="grow text-lg font-semibold text-black dark:text-white">
          Notice
        </h2>
        <div className="ml-2 flex justify-center">
          <button
            className="text-black focus:outline-none dark:text-white"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              fill="currentColor"
              className="size-4"
            >
              <path d="M224 128a8 8 0 0 1-8 8h-80v80a8 8 0 0 1-16 0v-80H40a8 8 0 0 1 0-16h80V40a8 8 0 0 1 16 0v80h80a8 8 0 0 1 8 8Z"></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="mx-1 flex max-h-[200px] w-full flex-wrap overflow-hidden transition-all duration-500">
        <div className="text-black dark:text-white">{message}</div>
      </div>
    </div>
  )
}

// 3. Define the 'StreamingComponent' functional component that renders the 'currentLlmResponse'
const StreamingComponent = ({
  currentLlmResponse
}: {
  currentLlmResponse: string
}) => {
  return (
    <>
      {currentLlmResponse && (
        <div className="mt-4 rounded-lg bg-white p-4 shadow-lg dark:bg-slate-800">
          <div className="flex items-center">
            <h2 className="grow text-lg font-semibold text-black dark:text-white">
              Answer
            </h2>
            <img src="./groq.png" alt="groq logo" className="size-6" />
          </div>
          <div className="text-gray-800 dark:text-gray-300">
            {currentLlmResponse}
          </div>
        </div>
      )}
    </>
  )
}

// 4. Define the 'LLMResponseComponent' functional component that takes 'llmResponse', 'currentLlmResponse', 'index', and 'semanticCacheKey' as props
const LLMResponseComponent = ({
  llmResponse,
  currentLlmResponse,
  index,
  semanticCacheKey
}: LLMResponseComponentProps) => {
  const { clearSemanticCache } = useActions<typeof AI>()
  const [showModal, setShowModal] = useState(false)

  // 5. Check if 'llmResponse' is not empty
  const hasLlmResponse = llmResponse && llmResponse.trim().length > 0

  const handleClearCache = () => {
    clearSemanticCache(semanticCacheKey)
    setShowModal(true)
  }

  return (
    <>
      {showModal && (
        <Modal
          message={`The query of '${semanticCacheKey}' has been cleared from cache. `}
          onClose={() => setShowModal(false)}
        />
      )}

      {hasLlmResponse ? (
        <div className="mt-4 rounded-lg bg-white p-4 shadow-lg dark:bg-slate-800">
          {/* 6. If 'llmResponse' is not empty, render a div with the 'Markdown' component */}
          <div className="flex items-center">
            <h2 className="grow text-lg font-semibold text-black dark:text-white">
              Response
            </h2>
          </div>
          <div className="markdown-container text-gray-800 dark:text-gray-300">
            <Markdown>{llmResponse}</Markdown>
            <div className="flex items-center justify-end">
              <img
                src="./powered-by-groq.svg"
                alt="powered by groq"
                className="mt-2 h-6"
              />
            </div>
          </div>
          <button
            className="text-black focus:outline-none dark:text-white"
            onClick={handleClearCache}
          >
            Clear response from cache
          </button>
        </div>
      ) : (
        // 7. If 'llmResponse' is empty, render the 'StreamingComponent' with 'currentLlmResponse'
        <StreamingComponent currentLlmResponse={currentLlmResponse} />
      )}
    </>
  )
}

export default LLMResponseComponent
