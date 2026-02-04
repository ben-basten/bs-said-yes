import { z } from "zod";
import { eq, inArray, and } from "drizzle-orm";
import { db } from "~~/server/db";
import { members, rsvpResponses } from "~~/server/db/schema";
import { findMemberById } from "~~/server/repository/members";

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

  await db.batch([
    // Update all members of the household to not attending first
    db
      .update(members)
      .set({ isAttending: false })
      .where(eq(members.householdId, householdId)),

    // Update attending members (only if there are any)
    ...(body.attendingGuestIds.length > 0
      ? [
          db
            .update(members)
            .set({ isAttending: true })
            .where(
              and(
                eq(members.householdId, householdId),
                inArray(members.id, body.attendingGuestIds),
              ),
            ),
        ]
      : []),

    // Upsert RSVP response
    db
      .insert(rsvpResponses)
      .values({
        householdId,
        accommodations: body.accommodations,
        songRecommendations: body.songRecommendations,
      })
      .onConflictDoUpdate({
        target: [rsvpResponses.householdId],
        set: {
          accommodations: body.accommodations,
          songRecommendations: body.songRecommendations,
          updatedAt: new Date(),
        },
      }),
  ]);

  return { success: true };
});
