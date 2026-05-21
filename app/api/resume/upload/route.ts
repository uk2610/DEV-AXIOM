import { getCurrentUser } from "@/lib/ai/auth";
import { handleApiError, jsonResponse, rateLimit } from "@/lib/ai/api";
import { saveResume } from "@/lib/ai/repository";

const skillKeywords = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "AWS",
  "Docker",
  "GraphQL",
  "Redis",
  "System Design",
  "Testing",
];

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    rateLimit(`resume:upload:${user.id}`, 10);
    const formData = await request.formData();
    const file = formData.get("file");
    const pastedText = String(formData.get("text") || "");

    let rawText = pastedText;
    let fileName = "pasted-resume.txt";
    if (file instanceof File) {
      fileName = file.name;
      rawText = await file.text().catch(() => pastedText);
    }

    const skills = skillKeywords.filter((skill) => rawText.toLowerCase().includes(skill.toLowerCase()));
    const weakAreas = ["scalability tradeoffs", "measurable impact", "failure-mode analysis"].filter(
      (area) => !rawText.toLowerCase().includes(area.split(" ")[0]),
    );
    const generatedQuestions = [
      `Walk me through the most technically complex ${skills[0] || "frontend"} project on your resume.`,
      "What production failure taught you the most, and how did you prevent recurrence?",
      "How would you scale one of your listed projects to 10x traffic?",
    ];

    const result = { userId: user.id, fileName, rawText, skills, weakAreas, generatedQuestions };
    await saveResume(result);
    return jsonResponse(result);
  } catch (error) {
    return handleApiError(error);
  }
}
