/**
 * Helper khusus untuk halaman listing properti
 * Sesuai dengan tabel requirement Schema.org
 * Menggabungkan BreadcrumbList + ItemList dengan RealEstateListing nested
 */

import { Graph, ItemList, PropertyValue, RealEstateListing } from "schema-dts";
import { schemaBreadcrumb, PathSegment } from "./schema-breadcrumb";
import { Property, PropertyParams } from "../../../types/property-types";
import { cleanDescription } from "../../../utils/cleanDescription";

// Tipe data properti dari API Anda

const DOMAIN = "https://www.brighton.co.id";

/**
 * Generate breadcrumb berdasarkan category dan slug
 */
function generateBreadcrumbs(category: "dijual" | "disewa" | "dijualsewa", slug?: string[], searchParams?: PropertyParams): PathSegment[] {
  const breadcrumbs: PathSegment[] = [{ label: "Home", url: DOMAIN }];

  // Base category
  const categoryLabel = category === "dijual" ? "Dijual" : category === "dijualsewa" ? "Dijual & Disewa" : "Disewa";
  breadcrumbs.push({
    label: categoryLabel,
    url: `${DOMAIN}/${category}`,
  });

  // Add property type if exists
  if (searchParams?.Type) {
    const propertyTypeLabel = searchParams.Type.replace(/-/g, " ");
    breadcrumbs.push({
      label: propertyTypeLabel,
      url: `${DOMAIN}/${category}/${searchParams.Type}`,
    });
  }

  // Add location breadcrumbs from slug
  if (slug && slug.length > 0) {
    let currentPath = `${DOMAIN}/${category}`;

    slug.forEach((segment, index) => {
      // Skip if it's property type (already added above)
      if (index === 0 && searchParams?.Type && segment === searchParams.Type) {
        currentPath += `/${segment}`;
        return;
      }

      currentPath += `/${segment}`;
      const label = segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      breadcrumbs.push({
        label,
        url: currentPath,
      });
    });
  }

  // Add city if in searchParams but not in slug
  if (searchParams?.LocationTitle && !slug?.some((s) => s.toLowerCase() === searchParams.LocationTitle?.toLowerCase())) {
    const citySlug = searchParams.LocationTitle.toLowerCase().replace(/\s+/g, "-");
    breadcrumbs.push({
      label: searchParams.LocationTitle,
      url: `${DOMAIN}/${category}/${citySlug}`,
    });
  }

  return breadcrumbs;
}

/**
 * Generate listing name/title
 */
function generateListingName(category: "dijual" | "disewa" | "dijualsewa", searchParams?: PropertyParams, slug?: string[]): string {
  const parts: string[] = [];

  // Property type
  if (searchParams?.Type) {
    parts.push(searchParams.Type.replace(/-/g, " "));
  } else {
    parts.push("Properti");
  }

  // Transaction type
  if (category === "dijual") {
    parts.push("Dijual");
  } else if (category === "dijualsewa") {
    parts.push("Dijual & Disewa");
  } else {
    parts.push("Disewa");
  }

  // Location
  if (searchParams?.LocationTitle) {
    parts.push(`di ${searchParams.LocationTitle}`);
  } else if (searchParams?.ProvinceTitle) {
    parts.push(`di ${searchParams.ProvinceTitle}`);
  } else if (slug && slug.length > 0) {
    const lastSlug = slug[slug.length - 1];
    const locationName = lastSlug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    parts.push(`di ${locationName}`);
  }

  return parts.join(" ");
}

/**
 * Generate listing description
 */
function generateListingDescription(category: "dijual" | "disewa" | "dijualsewa", searchParams?: PropertyParams, totalProperties?: number): string {
  const transactionText = category === "dijual" ? "dijual" : category === "dijualsewa" ? "dijual dan disewa" : "disewa";

  const propertyType = searchParams?.Type ? searchParams.Type.replace(/-/g, " ") : "properti";

  const location = searchParams?.LocationTitle || searchParams?.ProvinceTitle || "Indonesia";

  const countText = totalProperties ? `${totalProperties.toLocaleString("id-ID")}+ ` : "";

  return `Temukan ${countText}${propertyType} ${transactionText} di ${location}. Listing terlengkap dengan harga terbaik di Brighton Real Estate.`;
}

/**
 * Build RealEstateListing schema for each property (nested in ItemList)
 * Sesuai tabel: name, description, url, areaServed, image, address, floorsize,
 * offers, seller/agent, additionalProperty, mainEntityOfPage, sameAs
 */
function buildRealEstateListingItem(property: Property, position: number) {
  const propertyUrl = property.Link ? `${DOMAIN}/cari-properti/view/${property.Link}` : "";

  const name = property.Title || `${property.Type || "Properti"} di ${property.Location.Title || property.Location.Province || ""}`;

  let description = cleanDescription(property.Other || "");
  if (!description && property.KT && property.KM) {
    description = `${property.Type || "Properti"} dengan ${property.KT} kamar tidur, ${property.KM} kamar mandi`;
    if (property.LT) {
      description += `, luas tanah ${property.LT}m²`;
    }
    if (property.LB) {
      description += `, luas bangunan ${property.LB}m²`;
    }
  }

  // Build RealEstateListing sesuai requirement
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const realEstateListing: RealEstateListing = {
    "@type": "RealEstateListing",
    name,
    description: description || undefined,
    url: propertyUrl,
    image: property.Photo?.MediumWebP || property.Photo?.Medium || "",

    // offers: Harga dan availability
    offers: property.Price
      ? {
          "@type": "Offer",
          price: property.Price,
          priceCurrency: "IDR",
          availability: "https://schema.org/InStock",
          url: propertyUrl,
        }
      : undefined,

    // seller/agent: Info agen (RealEstateAgent)
    reviewedBy: property.Agent
      ? Array.isArray(property.Agent)
        ? property.Agent.filter(Boolean).map((agent) => ({
            "@type": "RealEstateAgent",
            name: agent.Name,
            telephone: agent.Phone,
            email: agent.Email,
            image: agent.Photo.MediumWebP || agent.Photo.Medium || "",
            url: agent.Link ? `${DOMAIN}/agent/${agent.Link}` : undefined,
            address: agent.Office?.Address
              ? {
                  "@type": "PostalAddress",
                  streetAddress: agent.Office?.Address,
                  addressLocality: agent.Office?.City,
                  addressRegion: agent.Office?.LocationAndProvince,
                  addressCountry: "ID",
                }
              : undefined,
          }))
        : {
            "@type": "RealEstateAgent",
            name: property.Agent.Name,
            telephone: property.Agent.Phone,
            email: property.Agent.Email,
            image: property.Agent.Photo.MediumWebP || property.Agent.Photo.Medium || "",
            url: property.Agent.Link ? `${DOMAIN}/agent/${property.Agent.Link}` : undefined,
            address: property.Agent.Office?.Address
              ? {
                  "@type": "PostalAddress",
                  streetAddress: property.Agent.Office.Address,
                  addressLocality: property.Agent.Office.City,
                  addressRegion: property.Agent.LocationAndProvince,
                  addressCountry: "ID",
                }
              : undefined,
          }
      : undefined,

    // additionalProperty: Detail tambahan (kamar, dll)
    identifier: [
      property.KT
        ? {
            "@type": "PropertyValue",
            name: "Kamar Tidur",
            value: property.KT,
          }
        : null,
      property.KM
        ? {
            "@type": "PropertyValue",
            name: "Kamar Mandi",
            value: property.KM,
          }
        : null,
      property.LT
        ? {
            "@type": "PropertyValue",
            name: "Luas Tanah",
            value: `${property.LT} m²`,
          }
        : null,
      property.LB
        ? {
            "@type": "PropertyValue",
            name: "Luas Bangunan",
            value: `${property.LB} m²`,
          }
        : null,
    ].filter(Boolean) as PropertyValue[],

    // mainEntityOfPage: URL utama halaman ini
    mainEntityOfPage: propertyUrl,
  };

  // Remove undefined values
  (Object.keys(realEstateListing) as Array<keyof typeof realEstateListing>).forEach((key) => {
    if (realEstateListing[key] === undefined) {
      // use a cast to any to perform delete without TS index errors
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (realEstateListing as any)[key];
    }
  });

  return {
    "@type": "ListItem",
    position,
    name,
    url: propertyUrl,
    // item berisi RealEstateListing lengkap
    item: realEstateListing,
  };
}

/**
 * Build ItemList dengan numberOfItems dan itemListElement
 * itemListElement berisi array RealEstateListing (nested)
 */
function buildItemList({ name, description, url, properties, totalProperties }: { name: string; description: string; url: string; properties: Property[]; totalProperties?: number }): ItemList {
  return {
    "@type": "ItemList",
    name,
    description,
    url,
    // numberOfItems: Total semua properti (bukan hanya yang di page ini)
    numberOfItems: totalProperties || properties.length,

    // itemListElement: Array berisi RealEstateListing
    itemListElement: properties.map((property, index) => buildRealEstateListingItem(property, index + 1)),
  } as ItemList;
}

/**
 * Build complete schema for property listing page
 * Menggabungkan BreadcrumbList + ItemList (dengan RealEstateListing nested)
 */
export function buildPropertyListingSchema({
  category,
  slug,
  searchParams,
  properties,
  totalProperties,
}: {
  category: "dijual" | "disewa" | "dijualsewa";
  slug?: string[];
  searchParams?: PropertyParams;
  properties: Property[];
  totalProperties?: number;
}): Graph {
  // Generate breadcrumbs
  const breadcrumbs = generateBreadcrumbs(category, slug, searchParams);

  // Generate listing URL
  let listingUrl = `${DOMAIN}/${category}`;
  if (slug && slug.length > 0) {
    listingUrl += `/${slug.join("/")}`;
  }

  // Add query params to URL if exists
  const queryParams = new URLSearchParams();
  if (searchParams?.Type) queryParams.append("PropertyType", searchParams.Type);
  if (searchParams?.LocationTitle) queryParams.append("City", searchParams.LocationTitle);
  if (searchParams?.ProvinceTitle) queryParams.append("District", searchParams.ProvinceTitle);
  if (searchParams?.Keyword) queryParams.append("Keyword", searchParams.Keyword);

  const queryString = queryParams.toString();
  if (queryString) {
    listingUrl += `?${queryString}`;
  }

  // Generate listing metadata
  const listingName = generateListingName(category, searchParams, slug);
  const listingDescription = generateListingDescription(category, searchParams, totalProperties);

  // Build schema graph
  const schema: Graph = {
    "@context": "https://schema.org",
    "@graph": [
      // 1. BreadcrumbList - Navigasi (sesuai tabel)
      schemaBreadcrumb(breadcrumbs),

      // 2. ItemList dengan RealEstateListing nested di itemListElement
      buildItemList({
        name: listingName,
        description: listingDescription,
        url: listingUrl,
        properties,
        totalProperties,
      }),
    ],
  };

  return schema;
}

/**
 * Alternative: Build schema for empty listing (no results)
 */
export function buildEmptyListingSchema({ category, slug, searchParams }: { category: "dijual" | "disewa" | "dijualsewa"; slug?: string[]; searchParams?: PropertyParams }): Graph {
  const breadcrumbs = generateBreadcrumbs(category, slug, searchParams);

  let listingUrl = `${DOMAIN}/${category}`;
  if (slug && slug.length > 0) {
    listingUrl += `/${slug.join("/")}`;
  }

  const listingName = generateListingName(category, searchParams, slug);
  const listingDescription = generateListingDescription(category, searchParams, 0);

  return {
    "@context": "https://schema.org",
    "@graph": [
      schemaBreadcrumb(breadcrumbs),
      {
        "@type": "ItemList",
        name: listingName,
        description: listingDescription,
        url: listingUrl,
        numberOfItems: 0,
        itemListElement: [],
      },
    ],
  };
}
