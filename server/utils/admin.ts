import { createError, type RequestEvent } from "nuxt/server";

export const requireAdminSession = async (event: RequestEvent) => {
  const { user } = await getUserSession(event);
  const isAdmin = user?.permission === "admin" || false;
  if (!isAdmin) {
    throw createError({ status: 401, message: "Unauthorized" });
  }
};
