import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
    },
  },
  modules: [
    "@nuxt/fonts",
    "@nuxt/eslint",
    "nuxt-auth-utils",
    "@nuxt/image",
    "@pinia/nuxt",
    "@nuxtjs/plausible",
  ],
  plausible: {
    proxy: true,
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  image: {
    contentful: {},
  },
  fonts: {
    families: [
      {
        name: "EB Garamond",
        provider: "google",
        weights: ["400", "500", "600", "700", "800"],
        styles: ["normal", "italic"],
      },
    ],
  },
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    cmsSpace: "",
    cmsEnv: "",
    cmsApiKey: "",
    cmsPreviewApiKey: "",
    previewSecret: "",
    sessionPassword: "",
    sitePassword: "",
    discordWebhookUrl: "",
    // @ts-expect-error - cookie workaround
    session: {
      // Workaround to get login working on Safari locally: https://github.com/atinux/nuxt-auth-utils/issues/190#issuecomment-2393305396
      cookie: {
        secure: !import.meta.dev,
      },
    },
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
