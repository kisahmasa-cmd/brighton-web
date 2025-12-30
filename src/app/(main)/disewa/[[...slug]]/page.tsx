import PagePropertySecondary from "@/components/custom/PagePropertySecondary";
import { PropertyParams } from "../../../../../types/property-types";
import { buildPropertySlug } from "../../../../../utils/buildPropertySlug";
import { generateSecondaryMetadata } from "../../../../../utils/generateSecondaryMetadata";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<PropertyParams>;
}

export async function generateMetadata(ctx: PageProps) {
  return generateSecondaryMetadata(ctx, "Sewa");
}

export default async function Page({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const search = await searchParams;

  // If no slug, just render with search params
  if (!slug || slug.length === 0) {
    return <PagePropertySecondary category="disewa" searchParams={Promise.resolve(search)} />;
  }

  const { enhancedParams, isNotFound, typesData } = await buildPropertySlug(search, slug);

  return <PagePropertySecondary isNotFound={isNotFound} category="disewa" types={typesData} searchParams={Promise.resolve(enhancedParams)} slug={slug} />;
}
