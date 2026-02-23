export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);

  // If not logged in, prevent CDN from caching the redirect response
  if (!session?.user) {
    setResponseHeaders(event, {
      "Cache-Control": "private, no-store, no-cache, must-revalidate",
      "Netlify-CDN-Cache-Control": "no-store",
    });
  }
});
