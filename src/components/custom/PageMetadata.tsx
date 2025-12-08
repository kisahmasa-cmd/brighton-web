import { buildMetadata, MetaProps } from "@/lib/metadata";
import type { Metadata } from "next";

export function generatePageMetadata(meta: MetaProps): Metadata {
  return buildMetadata(meta);
}
