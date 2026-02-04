import z from "zod";
import { findMemberByName } from "~~/server/repository/members";

const querySchema = z.object({
  name: z.string().min(1).max(255),
});

export default defineEventHandler(async (event) => {
  await requireUserSession(event);
  const { name } = await getValidatedQuery(event, querySchema.parse);

  const member = await findMemberByName(name);

  if (!member) {
    throw createError({
      statusCode: 404,
      statusMessage: `Person not found`,
    });
  }

  return {
    self: {
      id: member.id,
      name: member.name as string,
      attending: member.isAttending,
    },
    guests: member.household.members
      .filter(
        (m): m is typeof m & { name: string } =>
          m.id !== member.id && m.name !== null,
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
      .map((m) => ({
        id: m.id,
        name: m.name,
        relationshipType: m.relationshipType,
        attending: m.isAttending,
      })),
    unknownGuests: member.household.members
      .filter((m) => m.id !== member.id && m.name === null)
      .map((m) => ({
        id: m.id,
        name: m.name,
        relationshipType: m.relationshipType,
        attending: m.isAttending,
      })),
  };
});
