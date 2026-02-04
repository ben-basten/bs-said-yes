import { z } from "zod";
import {
  findMemberById,
  updateHouseholdAttendance,
} from "~~/server/repository/members";
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
  const member = await findMemberById(body.mainGuestId);

  if (!member) {
    throw createError({
      statusCode: 404,
      statusMessage: "Guest not found",
    });
  }

  const householdId = member.householdId;

  // Update household attendance and RSVP response
  await updateHouseholdAttendance(householdId, body.attendingGuestIds);
  await upsertRsvpResponse(
    householdId,
    body.accommodations,
    body.songRecommendations,
  );

  return { success: true };
});
