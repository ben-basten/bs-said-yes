import { z } from "zod";
import {
  findGuestById,
  updateHouseholdAttendance,
  updatePlusOneName,
} from "~~/server/repository/guests";
import { upsertRsvpResponse } from "~~/server/repository/rsvp";
import { postToDiscord } from "~~/server/service/discord";
import { getInitials } from "~~/server/utils/helpers";

const bodySchema = z.object({
  mainGuestId: z.uuid(),
  attendingGuestIds: z.array(z.uuid()),
  accommodations: z.string().max(1000).optional().nullable(),
  songRecommendations: z.string().max(1000).optional().nullable(),
  plusOne: z
    .object({
      id: z.uuid(),
      name: z.string().min(1).max(255),
    })
    .optional(),
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
  return Promise.all([
    updateHouseholdAttendance(householdId, body.attendingGuestIds),
    upsertRsvpResponse(
      householdId,
      body.accommodations,
      body.songRecommendations,
    ),
    body.plusOne
      ? updatePlusOneName(householdId, body.plusOne.id, body.plusOne.name)
      : Promise.resolve(),
  ])
    .then(async () => {
      const initials = getInitials(guest.name);
      await postToDiscord(
        `**RSVP response received!**\nSubmitted by: ${initials}`,
        "rsvp",
      );
      return { success: true };
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error("Error submitting RSVP:", error);
      throw createError({
        statusCode: 500,
        message: "Failed to submit RSVP",
      });
    });
});
