import { z } from "zod";
import { db, stories } from "../db";

const bodySchema = z.object({
  title: z.string().max(255),
  author: z.string().max(255).optional(),
  story: z.string().max(5000),
});

export default defineEventHandler(async (event) => {
  await requireUserSession(event);
  const { title, author, story } = await readValidatedBody(
    event,
    bodySchema.parse,
  );

  return db
    .insert(stories)
    .values({
      title,
      author,
      story,
    })
    .then(() => {
      return { success: true };
    })
    .catch((error) => {
      console.error("Error inserting story:", error);
      throw createError({
        statusCode: 500,
        message: "Failed to save story",
      });
    });
});
