import { writeFile } from "fs/promises";
import path from "path";

const SITEMAPS = [
  "sitemap.xml",
  "sitemap_about.xml",
  "sitemap_agent.xml",
  "sitemap_dijual.xml",
  "sitemap_disewa.xml",
  "sitemap_general.xml",
  "sitemap_perumahanbaru.xml",
  "sitemap_cariproperti.xml",
  "sitemap_cariproperti_2.xml",
  "sitemap_cariproperti_3.xml",
  "sitemap_cariproperti_4.xml",
  "sitemap_cariproperti_5.xml",
  "sitemap_cariproperti_6.xml",
  "sitemap_cariproperti_7.xml",
  "sitemap_cariproperti_8.xml",
  "sitemap_cariproperti_9.xml",
  "sitemap_cariproperti_10.xml",
  "sitemap_cariproperti_11.xml",
  "sitemap_cariproperti_12.xml",
];

export async function GET() {
  const baseUrl = "https://storage.googleapis.com/brighton-files/sitemaps";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const results: Array<{ file: string; status: string; reason?: any }> = [];

  for (const file of SITEMAPS) {
    try {
      const url = `${baseUrl}/${file}`;
      const res = await fetch(url, { cache: "no-store" });

      if (!res.ok) {
        results.push({
          file,
          status: "failed",
          reason: res.status,
        });
        continue;
      }

      const xmlContent = await res.text();

      const filePath = path.join(process.cwd(), "public", file);

      await writeFile(filePath, xmlContent, "utf-8");

      results.push({
        file,
        status: "updated",
      });
    } catch (error) {
      results.push({
        file,
        status: "error",
        reason: error,
      });
    }
  }

  return Response.json({
    status: "success",
    updated: results,
  });
}
