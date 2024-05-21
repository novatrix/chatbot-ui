import { supabase } from "@/lib/supabase/browser-client"
import { AssemblyAI } from "assemblyai"

const apiKey = "d84297939bd14281998ed8358be2f951"

const client = new AssemblyAI({
  apiKey: apiKey
})

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

    // Transcribe the audio file using AssemblyAI
    const transcript = await client.transcripts.transcribe({
      audio: publicUrl
    })

    console.log("Transcription:", transcript)

    return data
  } catch (error) {
    console.error("Error uploading audio:", error)
    throw error
  }
}
