import { getAllRsvpResponses } from "~~/server/repository/rsvp";
import { requireAdminSession } from "~~/server/utils/admin";

export default defineEventHandler(async (event) => {
  await requireAdminSession(event);

  return await getAllRsvpResponses();
});
