import { supabase } from "@/lib/supabase/browser-client"
import { TablesInsert } from "@/supabase/types"

export const getMessageVideoItemsByMessageId = async (messageId: string) => {
  const { data: messageVideoItems, error } = await supabase
    .from("messages")
    .select(
      `
      id,
      videos (*)
    `
    )
    .eq("id", messageId)
    .single()

  if (!messageVideoItems) {
    throw new Error(error.message)
  }

  return messageVideoItems
}

export const createMessageVideoItems = async (
  messageVideoItems: TablesInsert<"videos">[]
) => {
  const { data: createdMessageVideoItems, error } = await supabase
    .from("videos")
    .insert(messageVideoItems)
    .select("*")

  if (!createdMessageVideoItems) {
    throw new Error(error.message)
  }

  return createdMessageVideoItems
}
