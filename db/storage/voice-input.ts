import { supabase } from "@/lib/supabase/browser-client"

export const uploadAudioToSupabase = async (
  audioBlob: Blob,
  fileName: string
) => {
  try {
    // Check if a file already exists
    const { data: listData, error: listError } = await supabase.storage
      .from("voice_input")
      .list()

    if (listError) {
      throw listError
    }

    // If a file exists, delete it
    if (listData && listData.length > 0) {
      const { error: deleteError } = await supabase.storage
        .from("voice_input")
        .remove([listData[0].name])

      if (deleteError) {
        throw deleteError
      }
    }

    // Upload the new file
    const { data, error } = await supabase.storage
      .from("voice_input")
      .upload(fileName, audioBlob, {
        contentType: "audio/wav"
      })

    if (error) {
      throw error
    }

    // Get the public URL of the uploaded file
    const { publicUrl } = supabase.storage
      .from("voice_input")
      .getPublicUrl(fileName).data

    // Call the API route to transcribe the audio
    const response = await fetch("/api/transcribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ audioUrl: publicUrl })
    })

    if (!response.ok) {
      throw new Error("Error transcribing audio")
    }

    const { text } = await response.json()

    return text
  } catch (error) {
    console.error("Error uploading audio:", error)
    throw error
  }
}
