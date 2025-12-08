import { WithContext, Organization, PostalAddress, ContactPoint } from "schema-dts";

export type OrganizationSchemaInput = {
  name: string;
  url: string;
  logo?: string;
  image?: string | string[];
  description?: string;
  email?: string;
  telephone?: string;
  address?: {
    street: string;
    city: string;
    region?: string;
    postalCode?: string;
    country?: string;
  };
  sameAs?: string[];
  founder?: {
    name: string;
    url?: string;
  };
  contactPoint?: {
    telephone: string;
    contactType: string;
    email?: string;
    areaServed?: string;
  }[];
};

export function schemaOrganization(data: OrganizationSchemaInput): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: data.name,
    url: data.url,
    logo: data.logo,
    image: data.image,
    description: data.description,
    email: data.email,
    telephone: data.telephone,
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
    sameAs: data.sameAs,
    founder: data.founder
      ? {
          "@type": "Person",
          name: data.founder.name,
          url: data.founder.url,
        }
      : undefined,
    contactPoint: data.contactPoint
      ? data.contactPoint.map<ContactPoint>((cp) => ({
          "@type": "ContactPoint",
          telephone: cp.telephone,
          contactType: cp.contactType,
          email: cp.email,
          areaServed: cp.areaServed,
        }))
      : undefined,
  };
}
