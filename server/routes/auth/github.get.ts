import { eq } from "drizzle-orm";
import type { AuthError } from "~~/shared/types/auth";
import type { AllowedUser } from "../../db";
import { db, allowedUsers } from "../../db";

export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user: githubUser }) {
    if (!githubUser.email) {
      const errorCode: AuthError = "unauthorized";
      return sendRedirect(event, `/admin/login?error=${errorCode}`);
    }

    let allowedUser: AllowedUser[];
    try {
      // Check if user is in the allowlist
      allowedUser = await db
        .select()
        .from(allowedUsers)
        .where(eq(allowedUsers.githubEmail, githubUser.email))
        .limit(1);
    } catch {
      const errorCode: AuthError = "unknown";
      return sendRedirect(event, `/admin/login?error=${errorCode}`);
    }

    if (allowedUser.length === 0) {
      // User is not authorized
      const errorCode: AuthError = "unauthorized";
      return sendRedirect(event, `/admin/login?error=${errorCode}`);
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
  onError(event) {
    const errorCode: AuthError = "oauth_failed";
    return sendRedirect(event, `/admin/login?error=${errorCode}`);
  },
});
