<template>
  <ContentContainer>
    <Heading as="h1">data: {{ data?.fields.cmsName }}</Heading>
  </ContentContainer>
</template>

<script setup lang="ts">
import * as contentful from "contentful";
const { cmsSpace, cmsApiKey, cmsEnv } = useRuntimeConfig();
const { data } = useAsyncData("landing", async () => {
  const client = contentful.createClient({
    space: cmsSpace,
    accessToken: cmsApiKey,
    environment: cmsEnv,
  });
  return client.getEntry<{
    fields: { cmsName: string };
    contentTypeId: string;
  }>("1oC9jdPQvkqvDi6Qd2phIl");
});
</script>
