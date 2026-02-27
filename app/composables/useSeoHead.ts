export const useSeoHead = (title: string | undefined) => {
  const url = useRequestURL();

  useHead({
    title,
    meta: [
      {
        property: "og:image",
        content: `${url.origin}/img/bench-og.jpg`,
      },
      {
        property: "og:title",
        content: title,
      },
    ],
  });
};
