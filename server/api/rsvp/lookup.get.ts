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

  return {
    self: {
      id: guest.id,
      name: guest.name as string,
      attending: guest.isAttending,
    },
    guests: guest.household.guests
      .filter(
        (g): g is typeof g & { name: string } =>
          g.id !== guest.id && g.name !== null,
      )
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
        name: g.name,
        relationshipType: g.relationshipType,
        attending: g.isAttending,
      })),
    unknownGuests: guest.household.guests
      .filter((g) => g.id !== g.id && g.name === null)
      .map((g) => ({
        id: g.id,
        name: g.name,
        relationshipType: g.relationshipType,
        attending: g.isAttending,
      })),
  };
});
