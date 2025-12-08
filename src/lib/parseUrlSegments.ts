export function parseUrlSegments(pathname: string) {
  return pathname.replace(/\/+$/, "").split("/").filter(Boolean);
}
