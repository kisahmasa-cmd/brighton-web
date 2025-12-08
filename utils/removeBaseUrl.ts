export function removeBaseUrl(url: string): string {
  const BASE_URL = "https://www.brighton.co.id";
  const DEV_BASE_URL = "https://dev.brighton.co.id";

  if (process.env.CLEAN === "ok" || process.env.NEXT_PUBLIC_CLEAN === "ok") {
    // Remove both base URLs if found
    if (url.startsWith(BASE_URL)) {
      return url.replace(BASE_URL, "");
    } else if (url.startsWith(DEV_BASE_URL)) {
      return url.replace(DEV_BASE_URL, "");
    } else {
      const urlMod = "/" + url;
      return urlMod;
    }
  }

  // In production, keep full URL
  return url;
}
