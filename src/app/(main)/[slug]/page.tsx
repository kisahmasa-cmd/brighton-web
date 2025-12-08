import { getAgentDetail } from "@/services/agent-service";
import { PropertyParams } from "../../../../types/property-types";
import { Metadata } from "next";
import CMSPageContent from "./cms-page";
import AgentDetailContent from "./agent-detail";
import { notFound } from "next/navigation";
import NotFound from "@/components/custom/NotFound";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<PropertyParams>;
}

// Define CMS page slugs
const CMS_PAGES = ["kebijakan-privasi", "syarat-dan-ketentuan", "pengecualian-tanggung-jawab", "pemberitahuan-hak-cipta", "about", "why-brighton"];
const IGNORE_SLUGS = ["visitor", "agent", "login", "register", "globals.css"];

// export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
//   const param = await params;
//   const slug = param.slug;
//   if (IGNORE_SLUGS.includes(slug)) {
//     return {
//       title: "Brighton Real Estate",
//       description: "Brighton Real Estate",
//     };
//   }

//   // Check if it's a CMS page
//   if (CMS_PAGES.includes(slug)) {
//     // You can fetch CMS data here to get dynamic metadata if needed
//     const titles: Record<string, string> = {
//       "kebijakan-privasi": "Kebijakan Privasi - Brighton Real Estate",
//       "syarat-dan-ketentuan": "Syarat & Ketentuan - Brighton Real Estate",
//       "tentang-kami": "Tentang Kami - Brighton Real Estate",
//       "pemberitahuan-hak-cipta": "Pemberitahuan Hak Cipta - Brighton Real Estate",
//     };

//     const descriptions: Record<string, string> = {
//       "kebijakan-privasi": "Brighton Real Estate mempertimbangkan privasi dan perlindungan data pribadi klien adalah prioritas kami.",
//       "syarat-dan-ketentuan": "Syarat dan ketentuan penggunaan layanan Brighton Real Estate.",
//       "tentang-kami": "Tentang Brighton Real Estate dan layanan kami.",
//       "pemberitahuan-hak-cipta": "Pemberitahuan Hak Cipta",
//     };

//     return {
//       title: titles[slug] ?? "Brighton Real Estate",
//       description: descriptions[slug] ?? "Brighton Real Estate",
//     };
//   }

//   // For agent pages
//   try {
//     const data = await getAgentDetail(slug);
//     return {
//       title: `${data.Data.Name} - Agen Brighton Real Estate`,
//       description: `Lihat profil dan properti dari ${data.Data.Name}, agen profesional Brighton Real Estate.`,
//     };
//   } catch {
//     return {
//       title: "Brighton Real Estate",
//       description: "Brighton Real Estate",
//     };
//   }
// }

export default async function Page({ params, searchParams }: PageProps) {
  const param = await params;
  const slug = param.slug;

  if (IGNORE_SLUGS.includes(slug)) {
    return (
      <div className="container px-4 -mt-14 mx-auto flex justify-center items-center min-h-dvh">
        <NotFound type={'page'} code={404} />
      </div>
    );
  }

  // Check if it's a CMS page
  if (CMS_PAGES.includes(slug)) {
    return <CMSPageContent slug={slug} />;
  }

  // Otherwise, treat it as an agent detail page
  return <AgentDetailContent params={params} searchParams={searchParams} />;
}
