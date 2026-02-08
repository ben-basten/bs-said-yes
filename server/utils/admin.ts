import type { H3Event } from "h3";

export const requireAdminSession = async (event: H3Event) => {
  const { user } = await getUserSession(event);
  const isAdmin = user?.permission === "admin" || false;
  if (!isAdmin) {
    throw createError({ statusCode: 403, message: "Forbidden" });
  }
};
