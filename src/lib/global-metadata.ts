import { headers } from "next/headers";
import { getMetaData } from "@/services/metadata-service";
import { generatePageMetadata } from "@/components/custom/PageMetadata";

export async function globalGenerateMetadata() {
  const h = await headers();
  const fullUrl = h.get("x-url") || "";
  const urlObj = new URL(fullUrl);
  const path = urlObj.pathname;

  const meta = await getMetaData(path);

  const keywords = meta.MetaKeyword?.split(",").map((k) => k.trim()) || [];

  return generatePageMetadata({
    title: meta.MetaTitle,
    description: meta.MetaDescription,
    keywords,
    canonical: fullUrl,
    openGraph: {
      title: meta.MetaTitle,
      description: meta.MetaDescription,
      url: fullUrl,
    },
  });
}
