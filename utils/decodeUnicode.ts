export function decodeUnicode(text: string) {
  return text.replace(/\\u[\dA-Fa-f]{4}/g, function (match: string) {
    return JSON.parse('"' + match + '"');
  });
}
