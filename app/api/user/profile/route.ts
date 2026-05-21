import { getCurrentUser } from "@/lib/ai/auth";
import { handleApiError, jsonResponse } from "@/lib/ai/api";

export async function GET() {
  try {
    const user = await getCurrentUser();
    return jsonResponse({
      user,
      subscription: {
        plan: "pro",
        status: "active",
        features: ["AI interviews", "Whisper transcription", "coding rounds", "analytics"],
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}
