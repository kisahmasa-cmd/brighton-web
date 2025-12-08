import type { Metadata } from "next";

export interface MetaProps {
  title?: string;
  description?: string;
  canonical?: string;
  keywords?: string[];
  robots?: {
    index?: boolean;
    follow?: boolean;
  };
  openGraph?: {
    title?: string;
    description?: string;
    url?: string;
    images?: {
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }[];
  };
}

export function buildMetadata({ title, description, canonical, keywords = [], openGraph, robots }: MetaProps): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: canonical
      ? {
          canonical,
        }
      : undefined,
    openGraph: openGraph
      ? {
          title: openGraph.title ?? title,
          description: openGraph.description ?? description,
          url: openGraph.url ?? canonical,
          images: openGraph.images,
        }
      : undefined,
    robots: robots
      ? {
          index: robots.index,
          follow: robots.follow,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        }
      : {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
  };
}
