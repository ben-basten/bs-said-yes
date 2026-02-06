import { db } from "~~/server/db";
import { rsvpResponses, households } from "~~/server/db/schema";
import { eq, desc, isNotNull, or } from "drizzle-orm";

export const upsertRsvpResponse = async (
  householdId: string,
  accommodations: string | null | undefined,
  songRecommendations: string | null | undefined,
) => {
  return db
    .insert(rsvpResponses)
    .values({
      householdId,
      accommodations,
      songRecommendations,
    })
    .onConflictDoUpdate({
      target: [rsvpResponses.householdId],
      set: {
        accommodations,
        songRecommendations,
        updatedAt: new Date(),
      },
    });
};

export const getAllRsvpResponses = async () => {
  return db
    .select({
      id: rsvpResponses.id,
      householdNickname: households.nickname,
      accommodations: rsvpResponses.accommodations,
      songRecommendations: rsvpResponses.songRecommendations,
      updatedAt: rsvpResponses.updatedAt,
    })
    .from(rsvpResponses)
    .leftJoin(households, eq(rsvpResponses.householdId, households.id))
    .where(
      or(
        isNotNull(rsvpResponses.accommodations),
        isNotNull(rsvpResponses.songRecommendations),
      ),
    )
    .orderBy(desc(rsvpResponses.updatedAt));
};
