import type { CodegenConfig } from "@graphql-codegen/cli";

const SPACE = process.env.NUXT_CMS_SPACE;
const ENVIRONMENT = process.env.NUXT_CMS_ENV;
const API_KEY = process.env.NUXT_CMS_API_KEY;

/**
 * Contentful includes a directive location that graphql@16 cannot parse. It is not needed to generate types for our queries.
 *
 * `graphql@17` resolves this issue, but is not supported by `graphql-request` yet.
 */
const fetchSchema: typeof fetch = async (input, init) => {
  const response = await fetch(input, init);
  const result = await response.json();

  for (const directive of result.data?.__schema?.directives ?? []) {
    directive.locations = directive.locations.filter(
      (location: string) => location !== "DIRECTIVE_DEFINITION",
    );
  }

  return new Response(JSON.stringify(result), response);
};

const config: CodegenConfig = {
  schema: {
    [`https://graphql.contentful.com/content/v1/spaces/${SPACE}/environments/${ENVIRONMENT}`]:
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
        customFetch: fetchSchema,
      },
  },
  documents: ["server/graphql/**/*.ts"],
  ignoreNoDocuments: true,
  generates: {
    "shared/types/graphql.ts": {
      config: {
        avoidOptionals: true,
        useTypeImports: true,
        scalars: {
          JSON: "@contentful/rich-text-types#Document",
        },
      },
      plugins: ["typescript", "typescript-operations"],
    },
  },
};

export default config;
