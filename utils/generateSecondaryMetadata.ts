import { globalGenerateMetadata } from "@/lib/global-metadata";
import { getMetaImageFromSeondary } from "@/services/homepage-service/secondary-new-service";

import { PropertyParams } from "../types/property-types";
import { buildPropertySlug } from "./buildPropertySlug";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<PropertyParams>;
}

//fetch timer
export async function fetchWithTimeout<T>(promise: Promise<T>, timeout = 500): Promise<T> {
  let timer: NodeJS.Timeout;

  const timeoutPromise = new Promise<T>((_, reject) => {
    timer = setTimeout(() => reject(new Error("timeout")), timeout);
  });

  return Promise.race([promise, timeoutPromise]).finally(() => {
    clearTimeout(timer);
  }) as Promise<T>;
}

export async function generateSecondaryMetadata({ params, searchParams }: PageProps, transaction: "Jual" | "Sewa" | "JualSewa") {
  const base = await globalGenerateMetadata();

  const { slug } = await params;
  const search = await searchParams;

  const { enhancedParams } = await buildPropertySlug(search, slug || []);

  let dataFirst = null;

  try {
    dataFirst = await fetchWithTimeout(
      getMetaImageFromSeondary({
        ...enhancedParams,
        Start: 0,
        Count: 1,
        Transaction: transaction,
        Keyword: enhancedParams.Keyword ?? slug?.[slug.length - 1]?.replace(/-/g, " "),
      }),
      500
    );
  } catch {
    dataFirst = null; // langsung fallback OG default
  }

  // OG Image → Foto pertama
  const ogImage = dataFirst?.Data?.[0]?.Photo?.MediumWebP || dataFirst?.Data?.[0]?.Photo?.Medium || dataFirst?.Data?.[0]?.Photos?.[0]?.MediumWebP || dataFirst?.Data?.[0]?.Photos?.[0]?.Medium || null;

  return {
    ...base,
    openGraph: {
      ...(base.openGraph ?? {}),
      title: base.openGraph?.title ?? base.title ?? "",
      description: base.openGraph?.description ?? base.description ?? "",
      images: ogImage
        ? [
            {
              url: ogImage, // CDN already absolute: OK
              width: 1200,
              height: 630,
            },
          ]
        : base.openGraph?.images,
    },
  };
}
