import { z } from "zod";

const bodySchema = z.object({
  password: z.string().max(50).min(1),
});

export default defineEventHandler(async (event) => {
  const { password } = await readValidatedBody(event, bodySchema.parse);

  const { sitePassword } = useRuntimeConfig();

  if (password === sitePassword) {
    await setUserSession(event, {
      user: {
        authenticated: true,
      },
    });
    return { success: true };
  }

  throw createError({
    statusCode: 401,
    message: "Invalid password",
  });
});
