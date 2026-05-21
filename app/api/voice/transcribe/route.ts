import { getCurrentUser } from "@/lib/ai/auth";
import { handleApiError, jsonResponse, rateLimit } from "@/lib/ai/api";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    rateLimit(`voice:transcribe:${user.id}`, 20);
    const formData = await request.formData();
    const audio = formData.get("audio");

    if (process.env.OPENAI_API_KEY && audio instanceof File) {
      const whisperForm = new FormData();
      whisperForm.append("file", audio);
      whisperForm.append("model", "whisper-1");
      const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
        body: whisperForm,
      });
      if (response.ok) {
        const data = await response.json();
        return jsonResponse({ transcript: data.text || "" });
      }
    }

    return jsonResponse({
      transcript:
        "I would start by clarifying the requirements, then propose a scalable design with measurable tradeoffs and clear failure handling.",
      mode: "demo-fallback",
    });
  } catch (error) {
    return handleApiError(error);
  }
}
