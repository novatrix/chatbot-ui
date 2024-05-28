import { supabase } from "@/lib/supabase/browser-client"

export const uploadMessageVideo = async (path: string, video: File) => {
  const bucket = "message_videos"

  const imageSizeLimit = 50000000 // 50MB

  if (video.size > imageSizeLimit) {
    throw new Error(`Video must be less than ${imageSizeLimit / 1000000}MB`)
  }

  const { error } = await supabase.storage.from(bucket).upload(path, video, {
    upsert: true
  })

  if (error) {
    throw new Error("Error uploading video")
  }

  return path
}

export const getMessageVideoFromStorage = async (filePath: string) => {
  const { data, error } = await supabase.storage
    .from("message_videos")
    .createSignedUrl(filePath, 60 * 60 * 24) // 24hrs

  if (error) {
    throw new Error("Error downloading message video")
  }

  return data.signedUrl
}
