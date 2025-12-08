import { notFound } from "next/navigation";
import React from "react";
import SearchFilter from "@/components/custom/SearchFilter";
import NewsSlider from "@/components/custom/NewsSlider";
import SearchFilterMobile from "@/components/custom/SearchFilterMobile";
import Listing from "@/components/custom/Listing";
import { getType, TypeResponse } from "@/services/property-service";
import { getPropertySecondary, PropertyResponse } from "@/services/homepage-service/secondary-new-service";
import InputPropertyOrderBy from "@/components/custom/InputPropertyOrderBy";
import { PropertyInfo, PropertyParams } from "../../../types/property-types";
import { ApiResponse } from "../../../utils/apiResponse";
import NotFound from "@/components/custom/NotFound";
import PropertyBreadcrumbs from "@/components/custom/PropertyBreadcrumbs";
import { ArticlesResponse, getArticles } from "@/services/article-service";
import { buildEmptyListingSchema, buildPropertyListingSchema } from "@/lib/schema/schema-listing-helpers";
import { InjectSchema } from "@/lib/schema/inject-schema";
import ErrorApiToast from "./ErrorApiToast";

interface PageProps {
  category: "dijual" | "disewa" | "dijualsewa";
  searchParams: Promise<PropertyParams>;
  types?: ApiResponse<PropertyInfo>;
  isNotFound?: boolean;
  slug?: string[];
}

const PagePropertySecondary = async ({ category, searchParams, types, isNotFound, slug }: PageProps) => {
  //  cuma dua category yang diizinkan
  if (category !== "dijual" && category !== "disewa" && category !== "dijualsewa") {
    notFound();
  }
  const transaction = category === "dijual" ? "Jual" : category === "dijualsewa" ? "JualSewa" : "Sewa";
  const search = await searchParams;
  const lastSlug = slug?.length ? slug[slug.length - 1] : undefined;
  const page = Number(search?.page) || 1;
  const limit = 12;
  const start = (page - 1) * limit;

  //declare data api
  let properties: PropertyResponse = {
    Data: [],
    Count: 0,
  };
  let dataPropertyType: TypeResponse = {
    Data: {
      MaximalCountGarage: 0,
      Type: [],
      Transaction: [],
      Hadap: [],
      Other: [],
      TypeCooperate: [],
      MainGroup: [],
      Air: [],
      Certificate: [],
      ListingAggreement: [],
      TypeNearbyLocation: [],
    },
    Count: 0,
  };
  let dataNews: ArticlesResponse = {
    Data: [],
    Count: 0,
  };
  let error = "";

  try {
    properties = await getPropertySecondary({
      ...search,
      Start: start,
      Transaction: transaction,
      Keyword: search.Keyword === undefined ? lastSlug?.replace(/-/g, " ") : search.Keyword,
    });
    dataPropertyType = types ?? (await getType());
    dataNews = await getArticles({ Count: 10, Page: 1 });
  } catch (err) {
    error = "Gagal Memuat Data";
    console.error(err);
  }

  //schema
  const hasProperties = properties?.Data && properties?.Data.length > 0;
  // normalize properties for schema: ensure Province is a string (schema expects string | undefined)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const normalizePropertyForSchema = (p: any) => {
    const provinceField =
      p?.Province && typeof p.Province === "object"
        ? // try common name fields, fallback to undefined
          p.Province.Name ?? p.Province.name ?? undefined
        : p?.Province;
    return {
      ...p,
      Province: provinceField,
    };
  };

  const schema = hasProperties
    ? buildPropertyListingSchema({
        category,
        slug,
        searchParams: search,
        properties: properties?.Data.map(normalizePropertyForSchema) || [],
        totalProperties: properties?.Count,
      })
    : buildEmptyListingSchema({
        category,
        slug,
        searchParams: search,
      });
  return (
    <>
      {/* Inject Schema ke dalam <head> */}
      <InjectSchema data={schema} />
      <ErrorApiToast error={error} />
      <main className="w-full">
        <div className="hidden sm:block w-full bg-primary py-10">
          <div className="container max-w-7xl mx-auto px-4 lg:px-0">
            <SearchFilter category={category} params={search} propertyInfo={dataPropertyType.Data} lastSlug={lastSlug}></SearchFilter>
          </div>
        </div>
        <div className="block sm:hidden w-full px-4">
          <SearchFilterMobile category={category} params={search} propertyInfo={dataPropertyType.Data} lastSlug={lastSlug} />
        </div>
        <div className=" container max-w-7xl mx-auto px-4 lg:px-0 py-4 sm:py-10">
          <div className="w-full flex items-center justify-between mb-6">
            <PropertyBreadcrumbs category={category} params={search} />

            <InputPropertyOrderBy category={category} params={search} />
          </div>

          {properties?.Data.length ? (
            <>
              <Listing properties={properties} params={search} category={category} />
            </>
          ) : (
            <div className="py-10 mb-10">
              <NotFound />
            </div>
          )}

          <div className="w-full mt-10 sm:mt-0">
            {dataNews.Data.length > 0 ? (
              <NewsSlider Title="Berita Terbaru" data={dataNews.Data} />
            ) : (
              <div className="py-5 mb-5">
                <NotFound type="News" />
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default PagePropertySecondary;
