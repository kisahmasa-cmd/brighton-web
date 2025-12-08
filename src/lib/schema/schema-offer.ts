import { WithContext, Offer } from "schema-dts";

export type OfferSchemaInput = {
  price: number | string;
  priceCurrency: string;
  availability?: string;
  validFrom?: string;
  validThrough?: string;
  url?: string;
  seller?: {
    name: string;
    url?: string;
  };
  itemOffered?: {
    name: string;
    url?: string;
    description?: string;
  };
};

export function schemaOffer(data: OfferSchemaInput): WithContext<Offer> {
  return {
    "@context": "https://schema.org",
    "@type": "Offer",
    price: data.price,
    priceCurrency: data.priceCurrency,
    // availability: data.availability || "https://schema.org/InStock",
    validFrom: data.validFrom,
    validThrough: data.validThrough,
    url: data.url,
    seller: data.seller
      ? {
          "@type": "Organization",
          name: data.seller.name,
          url: data.seller.url,
        }
      : undefined,
    itemOffered: data.itemOffered
      ? {
          "@type": "Product",
          name: data.itemOffered.name,
          url: data.itemOffered.url,
          description: data.itemOffered.description,
        }
      : undefined,
  };
}
