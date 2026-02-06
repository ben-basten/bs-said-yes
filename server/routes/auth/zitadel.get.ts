import type { AuthError } from "~~/shared/types/AuthError";
import { getAllowedUserByEmail } from "../../repository/users";
import type { AllowedUser } from "~~/server/db/schema";

export default defineOAuthZitadelEventHandler({
  config: {
    scope: ["openid", "email", "profile"],
  },
  async onSuccess(event, { user: zitadelUser }) {
    if (!zitadelUser.email) {
      const errorCode: AuthError = "unauthorized";
      return sendRedirect(event, `/admin/login?error=${errorCode}`);
    }

    let allowedUser: AllowedUser | null = null;
    try {
      allowedUser = await getAllowedUserByEmail(zitadelUser.email);
    } catch {
      const errorCode: AuthError = "unknown";
      return sendRedirect(event, `/admin/login?error=${errorCode}`);
    }

    if (!allowedUser) {
      const errorCode: AuthError = "unauthorized";
      return sendRedirect(event, `/admin/login?error=${errorCode}`);
    }

    await setUserSession(event, {
      user: {
        permission: "admin",
        name: zitadelUser.given_name,
      },
    });

    return sendRedirect(event, "/admin/dashboard");
  },
  onError(event) {
    const errorCode: AuthError = "oauth_failed";
    return sendRedirect(event, `/admin/login?error=${errorCode}`);
  },
});
