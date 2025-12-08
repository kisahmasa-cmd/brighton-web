export type RealEstateListingSchemaInput = {
  id: string; // unique url or identifier
  name: string;
  description?: string;
  url: string;
  images?: string[];
  additionalProperty?: { name: string; value: string }[];
  mainEntityOfPage?: string;
  sameAs?: string[];
};

import { WithContext, RealEstateListing, PropertyValue } from "schema-dts";

export function buildRealEstateListing(data: RealEstateListingSchemaInput): WithContext<RealEstateListing> {
  const listing: WithContext<RealEstateListing> = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: data.name,
    description: data.description,
    url: data.url,
    image: data.images,
    identifier: data.id,
    mainEntityOfPage: data.mainEntityOfPage,
    sameAs: data.sameAs,
  };

  // Clean undefined values
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Object.keys(listing).forEach((key) => (listing as any)[key] === undefined && delete (listing as any)[key]);

  return listing;
}
