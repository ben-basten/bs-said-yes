import { eq } from "drizzle-orm";
import { db, users, allowedUsers } from "../../db";

export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user: githubUser }) {
    // Check if user is in the allowlist
    const allowedUser = await db
      .select()
      .from(allowedUsers)
      .where(eq(allowedUsers.githubUsername, githubUser.login))
      .limit(1);

    if (allowedUser.length === 0) {
      // User is not authorized
      return sendRedirect(event, "/admin/login?error=unauthorized");
    }

    // Check if user already exists in our database
    let existingUser = await db
      .select()
      .from(users)
      .where(eq(users.githubUsername, githubUser.login))
      .limit(1);

    // GitHub email can be null if user has no public email, use fallback
    const email =
      githubUser.email || `${githubUser.login}@users.noreply.github.com`;

    if (existingUser.length === 0) {
      // Create new user
      const newUser = await db
        .insert(users)
        .values({
          email,
          name: githubUser.name || githubUser.login,
          avatarUrl: githubUser.avatar_url,
          githubUsername: githubUser.login,
          provider: "github",
          providerId: String(githubUser.id),
          isAdmin: true,
        })
        .returning();

      existingUser = newUser;
    } else {
      // Update existing user info
      await db
        .update(users)
        .set({
          email,
          name: githubUser.name || githubUser.login,
          avatarUrl: githubUser.avatar_url,
          updatedAt: new Date(),
        })
        .where(eq(users.githubUsername, githubUser.login));
    }

    // Set user session
    await setUserSession(event, {
      user: {
        id: existingUser[0].id,
        email: existingUser[0].email,
        name: existingUser[0].name,
        avatarUrl: existingUser[0].avatarUrl,
        githubUsername: existingUser[0].githubUsername,
        isAdmin: existingUser[0].isAdmin,
      },
    });

    return sendRedirect(event, "/admin/dashboard");
  },
  onError(event, error) {
    console.error("GitHub OAuth error:", error);
    return sendRedirect(event, "/admin/login?error=oauth_failed");
  },
});
