import type { AuthError } from "~~/shared/types/AuthError";
import { getAllowedUserByEmail } from "../../repository/users";
import type { AllowedUser } from "~~/server/db/schema";

export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user: githubUser }) {
    if (!githubUser.email) {
      const errorCode: AuthError = "unauthorized";
      return sendRedirect(event, `/admin/login?error=${errorCode}`);
    }

    let allowedUser: AllowedUser | null = null;
    try {
      // Check if user is in the allowlist
      allowedUser = await getAllowedUserByEmail(githubUser.email);
    } catch {
      const errorCode: AuthError = "unknown";
      return sendRedirect(event, `/admin/login?error=${errorCode}`);
    }

    if (!allowedUser) {
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
