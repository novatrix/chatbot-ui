import { checkApiKey, getServerProfile } from "@/lib/server/server-chat-helpers"
import { ChatSettings } from "@/types"
import { AssemblyAI } from "assemblyai"

export const runtime = "edge"

export async function POST(request: Request) {
  const json = await request.json()
  const { chatSettings, audioUrl, fileName } = json as {
    chatSettings: ChatSettings
    audioUrl: string
    fileName: string
  }

  try {
    const profile = await getServerProfile()

    checkApiKey(profile.assemblyai_api_key, "AssemblyAI")

    const client = new AssemblyAI({
      apiKey: profile.assemblyai_api_key || ""
    })

    console.log("Public URL of the uploaded file:", audioUrl)

    // Transcribe the audio file using AssemblyAI
    const transcript = await client.transcripts.transcribe({
      audio: audioUrl
      //speech_model: 'nano'
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
