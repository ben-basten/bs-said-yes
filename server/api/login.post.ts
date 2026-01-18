export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const password = body?.password;

  // Get the site password from environment variable
  const sitePassword = process.env.NUXT_SITE_PASSWORD;

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
