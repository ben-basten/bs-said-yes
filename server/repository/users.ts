import { eq } from "drizzle-orm";
import { db, allowedUsers } from "~~/server/db";

export const getAllowedUserByEmail = async (email: string) => {
  const result = await db
    .select()
    .from(allowedUsers)
    .where(eq(allowedUsers.githubEmail, email))
    .limit(1);

  return result[0] || null;
};
