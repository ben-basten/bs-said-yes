export const useSeoHead = (title: string | undefined, image?: string) => {
  useHead({
    title,
    meta: [
      {
        property: "og:image",
        content: image,
      },
      {
        property: "og:title",
        content: title,
      },
    ],
  });
};
