import { getAllRsvpResponses } from "~~/server/repository/rsvp";

export default defineEventHandler(async (event) => {
  if (!event.context.isAdmin) {
    throw createError({ statusCode: 403, message: "Forbidden" });
  }

  return await getAllRsvpResponses();
});
