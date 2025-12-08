import { WithContext, RealEstateAgent, PostalAddress, Place, Organization } from "schema-dts";

export type RealEstateAgentSchemaInput = {
  name: string;
  url: string;
  image?: string;
  logo?: string;
  description?: string;
  telephone?: string;
  email?: string;
  address?: {
    street: string;
    city: string;
    region?: string;
    postalCode?: string;
    country?: string;
  };
  areaServed?: string[];
  sameAs?: string[];
  parentOrganization?: {
    name: string;
    url?: string;
    logo?: string;
  };
  openingHours?: string;
  latitude?: string;
  longitude?: string;
  location?: {
    name: string;
    address: {
      street: string;
      city: string;
      region?: string;
      postalCode?: string;
      country?: string;
    };
  };
};

export function schemaRealEstateAgent(data: RealEstateAgentSchemaInput): WithContext<RealEstateAgent> {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: data.name,
    url: data.url,
    image: data.image,
    logo: data.logo,
    description: data.description,
    telephone: data.telephone,
    email: data.email,
    address: data.address
      ? ({
          "@type": "PostalAddress",
          streetAddress: data.address.street,
          addressLocality: data.address.city,
          addressRegion: data.address.region,
          postalCode: data.address.postalCode,
          addressCountry: data.address.country,
        } as PostalAddress)
      : undefined,
    areaServed: data.areaServed
      ? data.areaServed.map<Place>((area) => ({
          "@type": "Place",
          name: area,
        }))
      : undefined,
    sameAs: data.sameAs,
    parentOrganization: data.parentOrganization
      ? ({
          "@type": "Organization",
          name: data.parentOrganization.name,
          url: data.parentOrganization.url,
          logo: data.parentOrganization.logo,
        } as Organization)
      : undefined,
    openingHours: data.openingHours,
    latitude: data.latitude,
    longitude: data.longitude,
    location: data.location
      ? ({
          "@type": "Place",
          name: data.location.name,
          address: {
            "@type": "PostalAddress",
            streetAddress: data.location.address.street,
            addressLocality: data.location.address.city,
            addressRegion: data.location.address.region,
            postalCode: data.location.address.postalCode,
            addressCountry: data.location.address.country,
          },
        } as Place)
      : undefined,
  };
}
