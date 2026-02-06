import { getMemoryById } from "~~/server/repository/memories";

export default defineEventHandler(async (event) => {
  await requireUserSession(event);
  const uuid = getRouterParam(event, "uuid");

  if (!uuid) {
    throw createError({
      statusCode: 400,
      message: "Missing UUID",
    });
  }

  const memory = await getMemoryById(uuid);

  if (!memory) {
    throw createError({
      statusCode: 404,
      message: "Memory not found",
    });
  }

  return {
    title: memory.title,
    author: memory.author ? memory.author : "Anonymous",
    story: memory.story,
  };
});
