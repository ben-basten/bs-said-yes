import { z } from "zod";
import { timingSafeEqual } from "node:crypto";

const bodySchema = z.object({
  password: z.string().max(50).min(1),
});

export default defineEventHandler(async (event) => {
  const { password } = await readValidatedBody(event, bodySchema.parse);

  const { sitePassword } = useRuntimeConfig();

  let isValidPassword: boolean;
  try {
    isValidPassword = timingSafeEqual(
      Buffer.from(password),
      Buffer.from(sitePassword),
    );
  } catch {
    isValidPassword = false;
  }

  if (isValidPassword) {
    await setUserSession(event, {
      user: {
        permission: "guest",
      },
    });
    return { success: true };
  }

  throw createError({
    status: 401,
    message: "Invalid password",
  });
});
