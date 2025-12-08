import AgentProfileCard from "@/components/custom/AgentProfileCard";
import { getAgentDetail } from "@/services/agent-service";
import { PropertyParams } from "../../../../types/property-types";
import { getPropertySecondary, PropertyResponse } from "@/services/homepage-service/secondary-new-service";
import InputPropertyOrderBy from "@/components/custom/InputPropertyOrderBy";
import Listing from "@/components/custom/Listing";
import SearchPropertyAgent from "@/components/custom/SearchPropertyAgent";
import NotFound from "@/components/custom/NotFound";
import { schemaPerson } from "@/lib/schema/schema-person";
import { headers } from "next/headers";
import { InjectSchema } from "@/lib/schema/inject-schema";

interface AgentDetailProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<PropertyParams>;
}

export default async function AgentDetailContent({ params, searchParams }: AgentDetailProps) {
  try {
    const param = await params;
    const slug = param.slug;
    const data = await getAgentDetail(slug);
    const search = await searchParams;
    const page = Number(search?.page) || 1;
    const limit = 12;
    const start = (page - 1) * limit;
    const properties: PropertyResponse = await getPropertySecondary({ ...search, Start: start, AgentID: data.Data.ID });
    const headersList = await headers();
    const proto = headersList.get("x-forwarded-proto") || "https";
    const host = headersList.get("host") || "";
    const fullUrl = `${proto}://${host}${headersList.get("x-pathname") || ""}`;

    //schema personal agent detail
    const personSchema = schemaPerson({
      name: data.Data.Name,
      image: data.Data.Photo.MediumWebP || data.Data.Photo.Medium || "",
      telephone: data.Data.Phone,
      email: data.Data.Email || "",
      url: fullUrl,
    });

    return (
      <>
        <InjectSchema data={personSchema} />
        <AgentProfileCard data={data.Data} />
        <div className="container mx-auto px-4 py-4 sm:py-10">
          <div className="flex flex-col-reverse md:flex-row w-full items-center gap-4">
            <InputPropertyOrderBy isHideMobile={true} category={slug} params={search} />
            <SearchPropertyAgent params={search} isTransparent={true} slug={slug} placeholder="Cari berdasarkan lokasi..." />
          </div>
          <div className="w-full flex items-center justify-between mb-6">
            <p className="text-center sm:text-left"></p>
          </div>

          <Listing properties={properties} params={search} />
        </div>
      </>
    );
  } catch (error) {
    console.error(error);

    return (
      <div className="container px-4 -mt-14 mx-auto flex justify-center items-center min-h-dvh">
        <NotFound type={"agent"} code={404} />
      </div>
    );
  }
}
