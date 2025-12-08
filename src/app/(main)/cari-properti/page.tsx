import PagePropertySecondary from "@/components/custom/PagePropertySecondary";
import { PropertyParams } from "../../../../types/property-types";
import { buildPropertySlug } from "../../../../utils/buildPropertySlug";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<PropertyParams>;
}

// export async function generateMetadata(props: PageProps): Promise<Metadata> {
//   const searchParams = await props.searchParams;
//   const page = searchParams.page;

//   let title = "Cari Properti Baru | Beli Rumah Baru | Beli Apartemen Baru";
//   if (page && page > 1) {
//     title = `${title} | Page ${page}`;
//   }

//   return {
//     title: title,
//   };
// }

export default async function Page({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const search = await searchParams;

  // If no slug, just render with search params
  if (!slug || slug.length === 0) {
    return <PagePropertySecondary category="dijualsewa" searchParams={Promise.resolve(search)} />;
  }

  const { enhancedParams, isNotFound, typesData } = await buildPropertySlug(search, slug);

  return <PagePropertySecondary isNotFound={isNotFound} category="dijualsewa" types={typesData} searchParams={Promise.resolve(enhancedParams)} />;
}
