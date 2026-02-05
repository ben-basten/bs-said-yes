import { z } from "zod";
import { createMemory } from "~~/server/repository/memories";
import { postToDiscord } from "../service/discord";

const bodySchema = z.object({
  title: z.string().min(1).max(255),
  author: z.string().max(255).optional(),
  story: z.string().min(1).max(5000),
});

export default defineEventHandler(async (event) => {
  await requireUserSession(event);
  const { title, author, story } = await readValidatedBody(
    event,
    bodySchema.parse,
  );

  return createMemory({
    title,
    author,
    story,
  })
    .then((result) => {
      const memory = result[0];
      if (!memory) {
        throw createError({
          statusCode: 500,
          message: "Failed to save story",
        });
      }
      postToDiscord(`**New memory received!**\nTitle: ${title}`);
      return { success: true, uuid: memory.uuid };
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error("Error inserting story:", error);
      throw createError({
        statusCode: 500,
        message: "Failed to save story",
      });
    });
});
