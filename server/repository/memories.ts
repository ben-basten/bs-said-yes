import { desc } from "drizzle-orm";
import { db } from "../db";
import { stories } from "../db/schema";

export const getMemories = async (limit: number = 20, page: number = 1) => {
  return await db
    .select({
      id: stories.id,
      title: stories.title,
      author: stories.author,
    })
    .from(stories)
    .orderBy(desc(stories.createdAt))
    .limit(limit)
    .offset((page - 1) * limit);
};

export const createMemory = async (data: {
  title: string;
  author?: string;
  story: string;
}) => {
  return await db.insert(stories).values(data);
};
