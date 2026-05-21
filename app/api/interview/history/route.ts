import { getCurrentUser } from "@/lib/ai/auth";
import { handleApiError, jsonResponse, rateLimit } from "@/lib/ai/api";
import { listInterviewHistory } from "@/lib/ai/repository";

export async function GET() {
  try {
    const user = await getCurrentUser();
    rateLimit(`interview:history:${user.id}`, 60);
    const history = await listInterviewHistory(user.id);
    return jsonResponse({ history });
  } catch (error) {
    return handleApiError(error);
  }
}
