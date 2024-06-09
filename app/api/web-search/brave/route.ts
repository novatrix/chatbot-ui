import { SearchResult } from "@/components/chat/search-answer/search-result-component.jsx"
import { config } from "@/app/search-config.jsx"
import { checkApiKey, getServerProfile } from "@/lib/server/server-chat-helpers"
import { ServerRuntime } from "next"

export const runtime: ServerRuntime = "edge"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const message = searchParams.get("message")
    const numberOfPagesToScan = config.numberOfPagesToScan

    if (!message) {
      return new Response("Missing search message", { status: 400 })
    }

    const response = await fetch(
      `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(message)}&count=${numberOfPagesToScan}`,
      {
        headers: {
          Accept: "application/json",
          "Accept-Encoding": "gzip",
          "X-Subscription-Token": process.env.BRAVE_API_KEY as string
        }
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${JSON.stringify(response)}`)
    }

    const jsonResponse = await response.json()
    if (!jsonResponse.web || !jsonResponse.web.results) {
      throw new Error("Invalid API response format")
    }

    const results: SearchResult[] = jsonResponse.web.results.map(
      (result: any): SearchResult => ({
        title: result.title,
        link: result.url,
        favicon: result.profile.img
      })
    )

    return new Response(JSON.stringify(results), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    })
  } catch (error) {
    console.error("Error in GET /api/web-search/brave:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
