export default defineEventHandler(async (event) => {
  const { user } = await getUserSession(event);

  event.context.isAdmin = user?.permission === "admin" || false;
});
