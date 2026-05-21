import { headers } from "next/headers";

export async function getCurrentUser() {
  try {
    const { auth } = await import("@/lib/auth");
    const session = await auth.api.getSession({ headers: await headers() });
    if (session?.user) {
      return {
        id: session.user.id,
        name: session.user.name || "Axiom User",
        email: session.user.email || "user@axiom.ai",
        image: session.user.image,
      };
    }
  } catch (error) {
    console.warn("Auth unavailable; using demo user.", error);
  }

  return {
    id: "demo-user",
    name: "Demo Candidate",
    email: "demo@axiom.ai",
    image: null,
  };
}
