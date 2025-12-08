/**
 * Helper untuk membangun schema terstruktur sesuai dengan tabel panduan
 * Mengikuti aturan dari dokumentasi schema.org
 */

import { Graph } from "schema-dts";
import { schemaHomepage } from "./schema-homepage";
import { schemaBreadcrumb, PathSegment } from "./schema-breadcrumb";
import { schemaItemList, ItemListElement } from "./schema-item-list";
import { buildRealEstateListing, RealEstateListingSchemaInput } from "./schema-property";
import { schemaRealEstateAgent, RealEstateAgentSchemaInput } from "./schema-real-estate-agent";
import { schemaOrganization, OrganizationSchemaInput } from "./schema-organization";
import { schemaProduct, ProductSchemaInput } from "./schema-product";
import { schemaWebPage } from "./schema-web-page";
import { schemaCollectionPage } from "./schema-collection-page";
import { schemaBlog } from "./schema-blog";
import { schemaBlogPosting } from "./schema-blog-posting";
import { schemaArticle } from "./schema-article";
import { schemaFAQ } from "./schema-faq";

/**
 * HALAMAN HOMEPAGE
 * Schema: Organization, WebSite, LocalBusiness
 */
export function buildHomepageSchema(): Graph {
  return schemaHomepage();
}

/**
 * HALAMAN LISTING PROPERTI
 * Schema: BreadcrumbList + ItemList (daftar properti)
 *
 * @param breadcrumbs - Navigasi breadcrumb
 * @param properties - List properti yang ditampilkan
 * @param listingUrl - URL halaman listing
 */
export function buildPropertyListingPageSchema({
  breadcrumbs,
  properties,
  listingUrl,
  listingName = "Daftar Properti",
  listingDescription,
}: {
  breadcrumbs: PathSegment[];
  properties: Array<{
    name: string;
    url: string;
    image?: string;
    description?: string;
  }>;
  listingUrl: string;
  listingName?: string;
  listingDescription?: string;
}): Graph {
  return {
    "@context": "https://schema.org",
    "@graph": [
      schemaBreadcrumb(breadcrumbs),
      schemaItemList({
        name: listingName,
        description: listingDescription,
        url: listingUrl,
        items: properties as ItemListElement[],
      }),
    ],
  };
}

/**
 * HALAMAN DETAIL PROPERTI
 * Schema: RealEstateListing (detail rumah/properti)
 * Bisa nested dengan seller (RealEstateAgent) dan offer
 *
 * @param property - Data properti lengkap
 */
export function buildRealEstateSchema(property: RealEstateListingSchemaInput): ReturnType<typeof buildRealEstateListing> {
  return buildRealEstateListing(property);
}

/**
 * HALAMAN KONTAK AGEN
 * Schema: Person (detail kontak agen)
 *
 * @param agent - Data kontak agen properti
 */
export function buildAgentContactSchema(agent: { name: string; telephone: string; email: string; photo?: string; url?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: agent.name,
    telephone: agent.telephone,
    email: agent.email,
    image: agent.photo,
    url: agent.url,
  };
}

/**
 * HALAMAN DETAIL AGEN REAL ESTATE
 * Schema: RealEstateAgent (detail lengkap agen/kantor)
 *
 * @param agent - Data lengkap agen real estate
 */
export function buildRealEstateAgentPageSchema(agent: RealEstateAgentSchemaInput) {
  return schemaRealEstateAgent(agent);
}

/**
 * HALAMAN ARTIKEL/BERITA (Homepage)
 * Schema: Blog, CollectionPage, atau WebPage
 *
 * @param blogData - Data halaman blog/artikel homepage
 */
export function buildBlogHomepageSchema({ name, description, url, image }: { name: string; description: string; url: string; image?: string }) {
  return schemaBlog({ name, description, url, image });
}

/**
 * HALAMAN ARTIKEL/BERITA (Detail Post)
 * Schema: BlogPosting, Article, atau WebPage
 *
 * @param article - Data artikel lengkap
 */
export function buildArticleDetailSchema({
  headline,
  description,
  url,
  image,
  datePublished,
  dateModified,
  authorName,
  name,
  type = "article", // 'article' atau 'blog'
}: {
  headline?: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  name: string;
  type?: "article" | "blog";
}) {
  if (type === "blog") {
    return schemaBlog({
      description,
      url,
      image,
      name,
    });
  }

  return schemaArticle({
    headline,
    description,
    url,
    image,
    datePublished,
    dateModified,
    authorName,
  });
}

/**
 * SEMUA HALAMAN (Global)
 * Schema: BreadcrumbList (navigasi)
 *
 * @param breadcrumbs - Path navigasi
 */
export function buildBreadcrumbSchema(breadcrumbs: PathSegment[]) {
  return schemaBreadcrumb(breadcrumbs);
}

/**
 * HALAMAN FAQ
 * Schema: FAQPage
 *
 * @param faqs - Daftar pertanyaan dan jawaban
 */
export function buildFAQPageSchema(faqs: Array<{ question: string; answer: string }>) {
  return schemaFAQ(faqs);
}

/**
 * HALAMAN KATEGORI/COLLECTION
 * Schema: CollectionPage
 *
 * @param collectionData - Data halaman collection
 */
export function buildCollectionPageSchema({ name, description, url, items }: { name: string; description: string; url: string; items?: Array<{ name: string; url: string }> }) {
  return schemaCollectionPage({ name, description, url, items });
}

/**
 * HALAMAN UMUM (WebPage)
 * Schema: WebPage
 *
 * @param pageData - Data halaman umum
 */
export function buildWebPageSchema({ name, description, url, isPartOf, image }: { name: string; description: string; url: string; isPartOf?: string; image?: string }) {
  return schemaWebPage({ name, description, url, isPartOf, image });
}

/**
 * HALAMAN ORGANISASI/PERUSAHAAN
 * Schema: Organization
 *
 * @param orgData - Data organisasi
 */
export function buildOrganizationSchema(orgData: OrganizationSchemaInput) {
  return schemaOrganization(orgData);
}

/**
 * HALAMAN PRODUK (jika ada produk selain properti)
 * Schema: Product + Offer
 *
 * @param productData - Data produk
 */
export function buildProductPageSchema(productData: ProductSchemaInput) {
  return schemaProduct(productData);
}

/**
 * Helper untuk membuat Graph dengan multiple schema
 * Berguna untuk halaman yang membutuhkan lebih dari 1 schema
 *
 * @example
 * ```tsx
 * const schemas = buildMultipleSchemas([
 *   buildBreadcrumbSchema(breadcrumbs),
 *   buildPropertyDetailSchema(property),
 *   buildAgentContactSchema(agent)
 * ]);
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function buildMultipleSchemas(schemas: Array<any>): Graph {
  return {
    "@context": "https://schema.org",
    "@graph": schemas,
  };
}
