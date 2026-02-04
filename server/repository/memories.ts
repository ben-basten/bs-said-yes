import { desc } from "drizzle-orm";
import { db } from "~~/server/db";
import { stories } from "~~/server/db/schema";

export const getMemories = async (limit: number = 20, page: number = 1) => {
  const [memories, totalResult] = await Promise.all([
    db
      .select({
        id: stories.id,
        title: stories.title,
        author: stories.author,
        story: stories.story,
      })
      .from(stories)
      .orderBy(desc(stories.createdAt))
      .limit(limit)
      .offset((page - 1) * limit),
    db.$count(stories),
  ]);

  const total = totalResult ?? 0;
  return { memories, total };
};

export const createMemory = async (data: {
  title: string;
  author?: string;
  story: string;
}) => {
  return await db.insert(stories).values(data);
};
