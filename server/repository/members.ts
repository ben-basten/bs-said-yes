import { db } from "~~/server/db";

export const findMemberByName = async (name: string) => {
  const trimmedName = name.trim();
  return db.query.members.findFirst({
    where: (members, { ilike, and, eq }) =>
      and(ilike(members.name, trimmedName), eq(members.isSearchable, true)),
    with: {
      household: {
        with: {
          members: true,
          // rsvpResponse: true,
        },
      },
    },
  });
};
