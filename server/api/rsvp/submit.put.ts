import { z } from "zod";
import {
  findGuestById,
  updateHouseholdAttendance,
} from "~~/server/repository/guests";
import { upsertRsvpResponse } from "~~/server/repository/rsvp";

const bodySchema = z.object({
  mainGuestId: z.uuid(),
  attendingGuestIds: z.array(z.uuid()),
  accommodations: z.string().max(1000).optional().nullable(),
  songRecommendations: z.string().max(1000).optional().nullable(),
});

export default defineEventHandler(async (event) => {
  await requireUserSession(event);
  const body = await readValidatedBody(event, bodySchema.parse);

  // 1. Find the household for the main guest
  const guest = await findGuestById(body.mainGuestId);

  if (!guest) {
    throw createError({
      statusCode: 404,
      statusMessage: "Guest not found",
    });
  }

  const householdId = guest.householdId;

  // Update household attendance and RSVP response
  await updateHouseholdAttendance(householdId, body.attendingGuestIds);
  await upsertRsvpResponse(
    householdId,
    body.accommodations,
    body.songRecommendations,
  );

  return { success: true };
});
