import { getAttendanceStatus } from "~~/server/repository/members";

export default defineEventHandler(async (event) => {
  if (!event.context.isAdmin) {
    throw createError({ statusCode: 403, message: "Forbidden" });
  }

  const result = await getAttendanceStatus();

  return { status: result[0] };
});
