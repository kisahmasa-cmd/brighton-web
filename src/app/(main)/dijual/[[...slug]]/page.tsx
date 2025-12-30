import PagePropertySecondary from "@/components/custom/PagePropertySecondary";
import { PropertyParams } from "../../../../../types/property-types";
import { buildPropertySlug } from "../../../../../utils/buildPropertySlug";
import { globalGenerateMetadata } from "@/lib/global-metadata";
import { getMetaImageFromSeondary } from "@/services/homepage-service/secondary-new-service";
import { generateSecondaryMetadata } from "../../../../../utils/generateSecondaryMetadata";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<PropertyParams>;
}

export async function generateMetadata(ctx: PageProps) {
  return generateSecondaryMetadata(ctx, "Jual");
}

export default async function Page({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const search = await searchParams;

  // If no slug, just render with search params
  if (!slug || slug.length === 0) {
    return <PagePropertySecondary slug={slug} category="dijual" searchParams={Promise.resolve(search)} />;
  }

  const { enhancedParams, isNotFound, typesData } = await buildPropertySlug(search, slug);

  return <PagePropertySecondary slug={slug} isNotFound={isNotFound} category="dijual" types={typesData} searchParams={Promise.resolve(enhancedParams)} />;
}
