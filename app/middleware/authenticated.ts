export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn, user } = useUserSession();

  // Check if route is an admin route
  if (to.path.startsWith("/admin")) {
    // Allow access to admin login page
    if (to.path === "/admin/login") {
      // If already logged in and is admin, redirect to dashboard
      if (loggedIn.value && user.value?.permission === "admin") {
        return navigateTo("/admin/dashboard");
      }
      return;
    }

    // For all other admin routes, require authentication and admin status
    if (!loggedIn.value || user.value?.permission !== "admin") {
      return navigateTo("/admin/login");
    }
    return;
  }

  // For non-admin routes: check site password authentication
  // Skip the login page itself
  if (to.path === "/login") {
    // If already logged in with site password, redirect to home
    if (loggedIn.value) {
      return navigateTo("/");
    }
    return;
  }

  // All other pages require site password authentication
  if (!loggedIn.value) {
    return navigateTo("/login");
  }
});
