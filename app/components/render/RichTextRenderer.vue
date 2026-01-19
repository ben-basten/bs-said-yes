<template>
  <div
    v-if="json"
    :class="[
      '[&_>_p]:type-body [&_>_ol]:type-body [&_>_ul]:type-body [&_>_ul]:list-disc [&_ol]:list-decimal [&_ul,&_ol]:ml-5 [&_li]:mb-3', // base
      '*:my-10 [&_>_p]:my-6 *:first:mt-0 *:last:mb-0', // margins
    ]"
  >
    <RichTextRenderer
      :document="filteredJson"
      :node-renderers="renderNodes()"
    />
  </div>
</template>

<script setup lang="ts">
import { Heading } from "#components";
import type {
  Document,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Paragraph,
} from "@contentful/rich-text-types";
import { BLOCKS } from "@contentful/rich-text-types";
import RichTextRenderer from "contentful-rich-text-vue-renderer";

const { json } = defineProps<{
  json: Document | undefined;
}>();

/**
 * Removes trailing empty paragraph tags.
 */
const filteredJson = computed((): Document | undefined => {
  if (!json?.content?.length) {
    return json;
  }

  const lastNode = json.content.at(-1);

  if (lastNode?.nodeType === BLOCKS.PARAGRAPH) {
    const isEmpty =
      !lastNode.content ||
      lastNode.content.every(
        (contentNode) =>
          contentNode.nodeType === "text" && !contentNode.value?.trim(),
      );

    if (isEmpty) {
      return {
        ...json,
        content: json.content.slice(0, -1),
      };
    }
  }

  return json;
});

function renderNodes() {
  return {
    break: () => h("br"),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [BLOCKS.PARAGRAPH]: (node: Paragraph, key: string, next: any) => {
      const nodeContentWithNewlineBr = node.content.map((childNode) => {
        if (childNode.nodeType === "text") {
          const splittedValue = childNode.value.split("\n");
          return splittedValue
            .reduce(
              (aggregate, value) => [
                ...aggregate,
                { ...childNode, value },
                { nodeType: "break" },
              ],
              [] as { nodeType: string; value?: string }[],
            )
            .slice(0, -1);
        }

        return childNode;
      });

      const updatedNode = {
        ...node,
        content: [...nodeContentWithNewlineBr].flat(),
      };

      return h("p", { key }, next(updatedNode.content, key, next));
    },
    [BLOCKS.HEADING_1]: (node: Heading1) => {
      // @ts-expect-error - needed to render heading content
      return h(Heading, { as: "h1" }, () => node.content?.[0]?.value);
    },
    [BLOCKS.HEADING_2]: (node: Heading2) => {
      // @ts-expect-error - needed to render heading content
      return h(Heading, { as: "h2" }, () => node.content?.[0]?.value);
    },
    [BLOCKS.HEADING_3]: (node: Heading3) => {
      // @ts-expect-error - needed to render heading content
      return h(Heading, { as: "h3" }, () => node.content?.[0]?.value);
    },
    [BLOCKS.HEADING_4]: (node: Heading4) => {
      // @ts-expect-error - needed to render heading content
      return h(Heading, { as: "h4" }, () => node.content?.[0]?.value);
    },
    [BLOCKS.HEADING_5]: (node: Heading5) => {
      // @ts-expect-error - needed to render heading content
      return h(Heading, { as: "h5" }, () => node.content?.[0]?.value);
    },
    [BLOCKS.HEADING_6]: (node: Heading6) => {
      // @ts-expect-error - needed to render heading content
      return h(Heading, { as: "h6" }, () => node.content?.[0]?.value);
    },
  };
}
</script>
