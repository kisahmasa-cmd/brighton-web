export const trimKeyword = (keyword: string): string | undefined => {
  const k = keyword.trim();
  return k.length > 0 ? k : undefined;
};
