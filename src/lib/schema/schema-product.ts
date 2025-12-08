import { WithContext, Product, Offer } from "schema-dts";

export type ProductSchemaInput = {
  name: string;
  description?: string;
  image?: string | string[];
  url: string;
  sku?: string;
  brand?: {
    name: string;
    url?: string;
  };
  offers?: {
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
  };
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
    bestRating?: number;
    worstRating?: number;
  };
  category?: string;
};

export function schemaProduct(data: ProductSchemaInput): WithContext<Product> {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: data.name,
    description: data.description,
    image: data.image,
    url: data.url,
    sku: data.sku,
    brand: data.brand
      ? {
          "@type": "Brand",
          name: data.brand.name,
          url: data.brand.url,
        }
      : undefined,
    offers: data.offers
      ? ({
          "@type": "Offer",
          price: data.offers.price,
          priceCurrency: data.offers.priceCurrency,
          availability: data.offers.availability || "https://schema.org/InStock",
          validFrom: data.offers.validFrom,
          validThrough: data.offers.validThrough,
          url: data.offers.url,
          seller: data.offers.seller
            ? {
                "@type": "Organization",
                name: data.offers.seller.name,
                url: data.offers.seller.url,
              }
            : undefined,
        } as Offer)
      : undefined,
    aggregateRating: data.aggregateRating
      ? {
          "@type": "AggregateRating",
          ratingValue: data.aggregateRating.ratingValue,
          reviewCount: data.aggregateRating.reviewCount,
          bestRating: data.aggregateRating.bestRating || 5,
          worstRating: data.aggregateRating.worstRating || 1,
        }
      : undefined,
    category: data.category,
  };
}
