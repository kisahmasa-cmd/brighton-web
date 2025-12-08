export const slugReadable = (slug: string): string => {
  if (!slug) return "";
  const text = slug.replace(/[-_]/g, " ");
  // Capitalize the first letter of each word
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
