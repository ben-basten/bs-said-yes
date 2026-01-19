import type { CodegenConfig } from "@graphql-codegen/cli";

const SPACE = process.env.NUXT_CMS_SPACE;
const ENVIRONMENT = process.env.NUXT_CMS_ENV;
const API_KEY = process.env.NUXT_CMS_API_KEY;

const config: CodegenConfig = {
  schema: {
    [`https://graphql.contentful.com/content/v1/spaces/${SPACE}/environments/${ENVIRONMENT}`]:
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      },
  },
  documents: ["server/graphql/**/*.ts"],
  ignoreNoDocuments: true,
  generates: {
    "shared/types/graphql.ts": {
      config: {
        avoidOptionals: true,
        useTypeImports: true,
      },
      plugins: ["typescript", "typescript-operations"],
    },
  },
};

export default config;
