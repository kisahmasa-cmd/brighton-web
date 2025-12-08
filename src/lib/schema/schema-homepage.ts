import { Graph, Organization, WebSite, RealEstateAgent, SearchAction } from "schema-dts";

// Hapus 'WithContext' dari return type. Gunakan 'Graph' saja.
export function schemaHomepage(): Graph {
  const domain = "https://www.brighton.co.id";

  return {
    "@context": "https://schema.org",
    "@graph": [
      // 1. Organization (Brand Identity)
      {
        "@type": "Organization",
        "@id": `${domain}/#organization`,
        name: "Brighton Real Estate Indonesia",
        url: domain,
        logo: `${domain}/themes/v7/img/logo_simple.svg`,
        alternateName: "Brighton ID",
        sameAs: [
          "https://www.facebook.com/BRIGHTON.ID",
          "https://twitter.com/mimpitanpabatas",
          "https://www.instagram.com/brighton.realestate/",
          "https://www.youtube.com/channel/UC7wpKdKwfPggl2Gm5eSqYgA",
          "https://www.linkedin.com/company/brighton-indonesia/",
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress: "SPAZIO Building unit 218, Kompleks Graha Festival, kav 3, Jl. Mayjen Yono Soewoyo, Pradahkalikendal, Kec. Dukuhpakis",
          addressLocality: "Surabaya",
          addressRegion: "Jawa Timur",
          postalCode: "60225",
          addressCountry: "ID",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            areaServed: "ID",
            telephone: "+628113009817",
            email: "customerservice.brighton@gmail.com",
            contactType: "Customer Service",
          },
        ],
      },

      // 2. WebSite (Sitelinks Search Box)
      {
        "@type": "WebSite",
        "@id": `${domain}/#website`,
        url: domain,
        name: "Brighton Real Estate",
        description: "Tempat ribuan listing rumah , tanah , ruko , apartemen dijual dan disewa hanya Brighton.co.id - Brighton Real Estate Agent Bringing Dream Beyond.",
        publisher: {
          "@id": `${domain}/#organization`,
        },
        inLanguage: "id-ID",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${domain}/dijual/rumah/?Keyword={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        } as SearchAction & { "query-input": string }, // <--- TAMBAHKAN INI
      },

      // 3. LocalBusiness
      {
        "@type": "LocalBusiness",
        "@id": `${domain}/surabaya`,
        name: "Brighton Real Estate Surabaya",
        image: `${domain}/logo.png`,
        url: domain,
        telephone: "+628113009817",
        parentOrganization: {
          "@id": `${domain}/#organization`,
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "SPAZIO Building unit 218, Kompleks Graha Festival, kav 3, Jl. Mayjen Yono Soewoyo, Pradahkalikendal, Kec. Dukuhpakis",
          addressLocality: "Surabaya",
          addressRegion: "Jawa Timur",
          postalCode: "60225",
          addressCountry: "ID",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: -7.2897175,
          longitude: 112.6776491,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "17:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Saturday",
            opens: "09:00",
            closes: "13:00",
          },
        ],
        priceRange: "$$",
      },
      // 4.  RealEstateAgent
      {
        "@type": "RealEstateAgent",
        name: "Brighton Real Estate",
        description: "Situs jual beli properti terbaik, terlengkap, dan terpercaya. Temukan ribuan listing rumah, apartemen, tanah, villa, ruko dan gudang hanya di Brighton.",
        image: `${domain}/themes/v7/img/logo_full.svg`,
        logo: `${domain}/themes/v7/img/logo_full.svg`,
        url: `${domain}`,
        telephone: "+628113009818",
        email: "customerservice.brighton@gmail.com",
        latitude: "-7.2897175",
        longitude: "112.6776491",
        areaServed: [{ "@type": "Place", name: "Indonesia" }],
        location: {
          "@type": "Place",
          name: "Brighton Real Estate",
          address: {
            "@type": "PostalAddress",
            streetAddress: "SPAZIO Building unit 218, Kompleks Graha Festival, kav 3, Jl. Mayjen Yono Soewoyo, Pradahkalikendal, Kec. Dukuhpakis",
            addressLocality: "Surabaya",
            addressRegion: "Jawa Timur",
            postalCode: "60225",
            addressCountry: "ID",
          },
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "SPAZIO Building unit 218, Kompleks Graha Festival, kav 3, Jl. Mayjen Yono Soewoyo, Pradahkalikendal, Kec. Dukuhpakis",
          addressLocality: "Surabaya",
          addressRegion: "Jawa Timur",
          postalCode: "60225",
          addressCountry: "ID",
        },
        sameAs: [
          "https://www.facebook.com/BRIGHTON.ID",
          "https://twitter.com/mimpitanpabatas",
          "https://www.instagram.com/brighton.realestate/",
          "https://www.youtube.com/channel/UC7wpKdKwfPggl2Gm5eSqYgA",
          "https://www.linkedin.com/company/brighton-indonesia/",
        ],
      },
    ],
  };
}
