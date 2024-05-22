import { LLM } from "@/types"

const ASSEMBLYAI_PLATFORM_LINK =
  "https://www.assemblyai.com/docs/getting-started/transcribe-an-audio-file"

const NANO: LLM = {
  modelId: "nano",
  modelName: "Nano",
  provider: "assemblyai",
  hostedId: "nano",
  platformLink: ASSEMBLYAI_PLATFORM_LINK,
  imageInput: false,
  pricing: {
    currency: "USD",
    unit: "per 1 hour",
    inputCost: 0.12,
    outputCost: 0.12
  }
}

const BEST: LLM = {
  modelId: "best",
  modelName: "Best",
  provider: "assemblyai",
  hostedId: "best",
  platformLink: ASSEMBLYAI_PLATFORM_LINK,
  imageInput: false,
  pricing: {
    currency: "USD",
    unit: "per 1 hour",
    inputCost: 0.37,
    outputCost: 0.37
  }
}

export const ASSEMBLYAI_LLM_LIST: LLM[] = [NANO, BEST]
