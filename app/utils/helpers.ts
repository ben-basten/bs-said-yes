export const ariaCurrent = (route: string, currentRoute: string) => {
  return route === currentRoute ? "page" : undefined;
};
