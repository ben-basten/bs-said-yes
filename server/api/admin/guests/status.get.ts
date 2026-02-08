import { getAttendanceStatus } from "~~/server/repository/guests";
import { requireAdminSession } from "~~/server/utils/admin";

export default defineEventHandler(async (event) => {
  await requireAdminSession(event);

  const result = await getAttendanceStatus();

  return { status: result[0] };
});
