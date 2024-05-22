import { checkApiKey, getServerProfile } from "@/lib/server/server-chat-helpers"
import { ChatSettings } from "@/types"
import { supabase } from "@/lib/supabase/browser-client"
import { AssemblyAI } from "assemblyai"

export const runtime = "edge"

export async function POST(request: Request) {
  const json = await request.json()
  const { chatSettings, audioBlob, fileName } = json as {
    chatSettings: ChatSettings
    audioBlob: Blob
    fileName: string
  }

  try {
    const profile = await getServerProfile()

    checkApiKey(profile.assemblyai_api_key, "AssemblyAI")

    const client = new AssemblyAI({
      apiKey: profile.assemblyai_api_key || ""
    })

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

    console.log("Public URL of the uploaded file:", publicUrl)

    // Transcribe the audio file using AssemblyAI
    const transcript = await client.transcripts.transcribe({
      audio: publicUrl
    })

    console.log("Transcript received:", transcript)

    // Respond with the transcript text
    return new Response(JSON.stringify({ text: transcript.text }), {
      status: 200
    })
  } catch (error: any) {
    console.error("Error during transcription process:", error)
    let errorMessage = error.message || "An unexpected error occurred"
    const errorCode = error.status || 500

    if (errorMessage.toLowerCase().includes("api key not found")) {
      errorMessage =
        "AssemblyAI API Key not found. Please set it in your profile settings."
    } else if (errorCode === 401) {
      errorMessage =
        "AssemblyAI API Key is incorrect. Please fix it in your profile settings."
    }

    return new Response(JSON.stringify({ message: errorMessage }), {
      status: errorCode
    })
  }
}
