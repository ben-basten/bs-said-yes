import z from "zod";
import { findGuestByName } from "~~/server/repository/guests";

const querySchema = z.object({
  name: z.string().min(1).max(255),
});

export default defineEventHandler(async (event) => {
  await requireUserSession(event);
  const { name } = await getValidatedQuery(event, querySchema.parse);

  const guest = await findGuestByName(name);

  if (!guest) {
    throw createError({
      statusCode: 404,
      statusMessage: `Person not found`,
    });
  }

  const guestName = guest.name as string;
  return {
    self: {
      id: guest.id,
      displayName: guestName,
      attending: guest.isAttending,
    },
    guests: guest.household.guests
      .filter((g) => g.id !== guest.id)
      .sort((a, b) => {
        const order: Record<string, number> = {
          primary: 0,
          plus_one: 1,
          child: 2,
        };
        return (
          (order[a.relationshipType] ?? 3) - (order[b.relationshipType] ?? 3)
        );
      })
      .map((g) => ({
        id: g.id,
        displayName: g.name ?? `Guest of ${guestName}`,
        attending: g.isAttending,
        isAnonymous: g.name === null && g.relationshipType === "plus_one",
      })),
    accommodations: guest.household.rsvpResponse?.accommodations || null,
    songRecommendations:
      guest.household.rsvpResponse?.songRecommendations || null,
  };
});
