import { Tables } from "@/supabase/types"

export interface ChatMessage {
  message: Tables<"messages">
  fileItems: string[]
  video?: Tables<"videos">
  places?: Tables<"places">
  shoppings?: Tables<"shoppings">
  searchResulst?: Tables<"search_results">
  llmResponseEnd?: boolean
  followUp?: any
  cachedData?: string
  semanticCacheKey?: any
}
