import { headers } from "next/headers";

export async function getCurrentSlug() {
  const headersList = await headers(); // ✅ pakai await
  const fullUrl = headersList.get("x-url") || headersList.get("referer") || "";
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  try {
    const { pathname } = new URL(fullUrl, base);
    const segments = pathname.split("/").filter(Boolean);

    return { pathname, segments };
  } catch {
    return { pathname: "", segments: [] };
  }
}
