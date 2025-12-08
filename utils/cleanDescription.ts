export function cleanDescription(rawString: string) {
  return rawString
    .replace(/\*|\_|\`/g, "") // Remove markdown characters: * _ `
    .replace(/\n+/g, " ") // Replace newlines with a single space
    .replace(/\s+/g, " ") // Replace multiple spaces with a single space
    .trim(); // Trim any extra spaces at the start and end
}
