import { z } from "zod";
import { eq, inArray, and } from "drizzle-orm";
import { db } from "~~/server/db";
import { members, rsvpResponses } from "~~/server/db/schema";

const bodySchema = z.object({
  mainGuestId: z.string().uuid(),
  attendingGuestIds: z.array(z.uuid()),
  accommodations: z.string().max(1000).optional(),
  songRecommendations: z.string().max(1000).optional(),
});

export default defineEventHandler(async (event) => {
  await requireUserSession(event);
  const body = await readValidatedBody(event, bodySchema.parse);

  // 1. Find the household for the main guest
  const member = await db.query.members.findFirst({
    where: eq(members.id, body.mainGuestId),
  });

  if (!member) {
    throw createError({
      statusCode: 404,
      statusMessage: "Guest not found",
    });
  }

  const householdId = member.householdId;

  // 2. Update database using batch (since neon-http doesn't support interactive transactions)
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
