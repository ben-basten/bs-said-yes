import { desc, eq } from "drizzle-orm";
import { db } from "~~/server/db";
import { memories } from "~~/server/db/schema";

export const getMemories = async (limit: number, page: number = 1) => {
  const [memoriesCollection, totalResult] = await Promise.all([
    db
      .select({
        id: memories.id,
        title: memories.title,
        author: memories.author,
        story: memories.story,
      })
      .from(memories)
      .orderBy(desc(memories.createdAt))
      .limit(limit)
      .offset((page - 1) * limit),
    db.$count(memories),
  ]);

  const total = totalResult ?? 0;
  return { memories: memoriesCollection, total };
};

export const getMemoryById = async (id: string) => {
  return await db
    .select({
      id: memories.id,
      title: memories.title,
      author: memories.author,
      story: memories.story,
    })
    .from(memories)
    .where(eq(memories.id, id))
    .then((res) => res[0]);
};

export const createMemory = async (data: {
  title: string;
  author?: string;
  story: string;
}) => {
  return await db.insert(memories).values(data).returning();
};
