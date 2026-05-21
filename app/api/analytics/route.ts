import { getCurrentUser } from "@/lib/ai/auth";
import { handleApiError, jsonResponse, rateLimit } from "@/lib/ai/api";
import { getAnalytics } from "@/lib/ai/repository";

export async function GET() {
  try {
    const user = await getCurrentUser();
    rateLimit(`analytics:${user.id}`, 60);
    const analytics = await getAnalytics(user.id);
    return jsonResponse({ analytics });
  } catch (error) {
    return handleApiError(error);
  }
}
