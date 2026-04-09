export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn, user } = useUserSession();

  // Check if route is an admin route
  if (to.path.startsWith("/admin")) {
    // For all other admin routes, require authentication and admin status
    if (!loggedIn.value || user.value?.permission !== "admin") {
      return navigateTo("/admin/login");
    }
    return;
  }

  // All other pages require site password authentication
  if (!loggedIn.value) {
    const isRoot = to.fullPath === "/";
    return navigateTo({
      path: "/login",
      query: { redirect: isRoot ? undefined : encodeURIComponent(to.fullPath) },
    });
  }
});
