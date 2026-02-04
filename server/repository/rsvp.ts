import { db, rsvpResponses } from "~~/server/db";

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
