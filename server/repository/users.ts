import { eq } from "drizzle-orm";
import { db } from "~~/server/db";
import { allowedUsers } from "~~/server/db/schema";

export const getAllowedUserByEmail = async (email: string) => {
  const result = await db
    .select()
    .from(allowedUsers)
    .where(eq(allowedUsers.email, email))
    .limit(1);

  return result[0] || null;
};
