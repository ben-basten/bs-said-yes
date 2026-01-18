import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/fonts", "@nuxt/eslint", "nuxt-auth-utils", "@nuxt/image"],
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  image: {
    contentful: {},
  },
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    cmsSpace: "",
    cmsEnv: "",
    cmsApiKey: "",
    sessionPassword: "",
    sitePassword: "",
  },
  vite: {
    plugins: [tailwindcss()],
  },
  typescript: {
    typeCheck: true,
  },
  devtools: { enabled: true },
  compatibilityDate: "2025-07-15",
});
