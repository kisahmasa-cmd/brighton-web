import { headers } from "next/headers";
import { getFastMetadata } from "@/services/fast-metadata-service";
import { generatePageMetadata } from "@/components/custom/PageMetadata";
import { shouldNoIndex } from "../../utils/seo-utils";

interface GlobalMetaOptions {
  defaultMeta?: {
    title?: string;
    description?: string;
    keywords?: string[];
    images?: string[];
  };
}

export async function globalGenerateMetadataOptimal(options: GlobalMetaOptions = {}) {
  const { defaultMeta = {} } = options;

  const h = await headers();

  const proto = h.get("x-forwarded-proto") || "https";
  const host = h.get("host") || "";
  const pathname = h.get("x-pathname") || ""; // optional jika kamu kirim ini
  const urlFromHeader = h.get("x-url") || "";

  let path = "";

  // Jika x-url ada → pakai pathname-nya
  if (urlFromHeader) {
    path = new URL(urlFromHeader).pathname;
  } else {
    // fallback ideal: gunakan header pathname jika server kirim
    path = pathname || "/";
  }

  const fullUrl = `${proto}://${host}${path}`;
  const fullUrlWithSearch = `${proto}://${host}${path}${urlFromHeader ? new URL(urlFromHeader).search : ""}`;
  const isNoIndex = shouldNoIndex(fullUrlWithSearch);

  const ignorePaths = ["/cari-properti/view/", "/perumahan-baru/viewdetail/"];
  const isIgnored = ignorePaths.some((p) => path.startsWith(p));
  const siteOrigin = `${proto}://${host}`;
  const defaultImages = `${siteOrigin}/banner-meta.webp`;

  if (isIgnored) {
    return generatePageMetadata({
      title: defaultMeta.title || "",
      description: defaultMeta.description || "",
      keywords: defaultMeta.keywords || [],
      canonical: fullUrl,
      openGraph: {
        title: defaultMeta.title || "",
        description: defaultMeta.description || "",
        url: fullUrl,
        images: [
          {
            url: defaultMeta.images?.[0] || defaultImages,
            width: 1200,
            height: 630,
          },
        ],
      },
    });
  }

  const meta = await getFastMetadata(path);

  const keywords = meta.MetaKeyword?.split(",").map((k: string) => k.trim()) || [];

  return generatePageMetadata({
    title: meta.MetaTitle,
    description: meta.MetaDescription,
    keywords,
    canonical: fullUrl,
    robots: isNoIndex
      ? {
          index: false,
          follow: true,
        }
      : {
          index: true,
          follow: true,
        },
    openGraph: {
      title: meta.MetaTitle,
      description: meta.MetaDescription,
      url: fullUrl,
      images: [
        {
          url: defaultMeta.images?.[0] || defaultImages,
          width: 1200,
          height: 630,
        },
      ],
    },
  });
}
