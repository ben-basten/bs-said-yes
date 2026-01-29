import { eq } from "drizzle-orm";
import { db, allowedUsers } from "../../db";

export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user: githubUser }) {
    if (!githubUser.email) {
      return sendRedirect(event, "/admin/login?error=unauthorized");
    }

    // Check if user is in the allowlist
    const allowedUser = await db
      .select()
      .from(allowedUsers)
      .where(eq(allowedUsers.githubEmail, githubUser.email))
      .limit(1);

    if (allowedUser.length === 0) {
      // User is not authorized
      return sendRedirect(event, "/admin/login?error=unauthorized");
    }

    // Set user session
    await setUserSession(event, {
      user: {
        permission: "admin",
        name: githubUser.name,
      },
    });

    return sendRedirect(event, "/admin/dashboard");
  },
  onError(event, error) {
    console.error("GitHub OAuth error:", error);
    return sendRedirect(event, "/admin/login?error=oauth_failed");
  },
});
