import React from "react";
import { Thing, WithContext, Graph } from "schema-dts"; // 1. Import Graph

// 2. Tambahkan '| Graph' ke dalam definisi tipe data
export function InjectSchema({ data }: { data: WithContext<Thing> | WithContext<Thing>[] | Graph }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
