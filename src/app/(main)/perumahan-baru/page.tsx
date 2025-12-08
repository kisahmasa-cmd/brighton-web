import React from "react";
import SearchFilterPrimaryMobile from "@/components/custom/SearchFilterPrimaryMobile";
import { getDeveloper, getPropertyPrimary, getType, PropertyPrimaryResponse } from "@/services/property-service";
import ListingPrimary from "@/components/custom/ListingPrimary";
import NotFound from "@/components/custom/NotFound";
import { PropertyParams } from "../../../../types/property-types";
import ContentHeaderPrimary from "@/components/custom/ContentHeaderPrimary";
import SearchFilterPrimary from "@/components/custom/SearchFilterPrimary";
import { getCitiesPrimary } from "@/services/location-service";
import { DEFAULT_RESPONSE } from "@/data/default-response";

interface PageProps {
  searchParams: Promise<PropertyParams>;
}

const page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const limit = 12;
  const start = (page - 1) * limit;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const safe = async (fn: any, ...args: any[]) => {
    try {
      return await fn(...args);
    } catch (e) {
      console.error("API ERROR:", e);
      return DEFAULT_RESPONSE;
    }
  };

  const isOverseas = params?.show === "overseas" ? 1 : 0;
  const properties: PropertyPrimaryResponse = await safe(getPropertyPrimary, {
    ...params,
    Overseas: isOverseas,
    Start: start,
    Count: limit,
  });
  const dataPropertyType = await safe(getType());
  const dataDeveloper = await safe(getDeveloper());

  const everythingFailed = properties.__error && dataPropertyType.__error && dataDeveloper.__error;
  if (everythingFailed) {
    return (
      <div className="py-20">
        <NotFound />
      </div>
    );
  }

  return (
    <main className="w-full mt-4 sm:mt-0">
      <div className="hidden sm:block w-full bg-primary py-10">
        <div className="container max-w-7xl mx-auto px-4 2xl:px-0">
          <SearchFilterPrimary params={params} propertyInfo={dataPropertyType?.Data} developer={dataDeveloper?.Data} />
        </div>
      </div>
      <div className="block sm:hidden w-full px-4">
        <SearchFilterPrimaryMobile params={params} propertyInfo={dataPropertyType?.Data} developer={dataDeveloper?.Data} />
      </div>
      <div className="container max-w-7xl mx-auto px-4 2xl:px-0 pt-4 pb-8 sm:py-10">
        <ContentHeaderPrimary params={params} />

        {properties.Data.length > 0 ? (
          <>
            <ListingPrimary properties={properties} params={params} />
          </>
        ) : (
          <div className="py-10 mb-10 mx-auto">
            <NotFound />
          </div>
        )}
      </div>
    </main>
  );
};

export default page;
