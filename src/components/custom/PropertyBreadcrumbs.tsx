"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { PropertyParams } from "../../../types/property-types";
import { buildPropertyUrl } from "../../../utils/buildPropertyUrl";

interface PropertyBreadcrumbsProps {
  category: "dijual" | "disewa" | "dijualsewa";
  params?: PropertyParams;
}

export default function PropertyBreadcrumbs({ category, params }: PropertyBreadcrumbsProps) {
  // Check if we should show breadcrumbs
  let labelPrefix = "";
  const showBreadcrumbs = Boolean(params?.Type || params?.ProvinceID || params?.LocationID || params?.AreaID);

  // If no params, show the default text
  if (!showBreadcrumbs) {
    return (
      <h1 className="text-center sm:text-left">
        Jual, Beli dan Cari Properti di Seluruh Indonesia <b>#HanyaDiBrighton</b>
      </h1>
    );
  }

  // Build breadcrumb items
  const breadcrumbs: Array<{ label: string; href?: { pathname: string; query: Record<string, undefined> } }> = [
    {
      label: "Beranda",
      href: { pathname: "/", query: {} },
    },
  ];

  // Add Type + Category
  if (params?.Type) {
    const typeParams: PropertyParams = {
      Type: params.Type,
    };
    const { pathname, query } = buildPropertyUrl(category, typeParams);
    breadcrumbs.push({
      label: `${params.Type} ${category === "dijual" ? "Dijual" : "Disewakan"}`,
      href: { pathname, query },
    });
  } else {
    const labelCategory = category === "dijual" ? "Dijual" : "Disewakan";
    labelPrefix = `Properti ${labelCategory} di `;
  }

  // Add Province
  if (params?.ProvinceTitle) {
    const provinceParams: PropertyParams = {
      Type: params.Type,
      ProvinceID: params.ProvinceID,
      ProvinceTitle: params.ProvinceTitle,
      ProvinceSlug: params.ProvinceSlug,
    };
    const { pathname, query } = buildPropertyUrl(category, provinceParams);
    breadcrumbs.push({
      label: params.ProvinceTitle,
      href: { pathname, query },
    });
  }

  // Add Location (City)
  if (params?.LocationTitle) {
    const locationParams: PropertyParams = {
      Type: params.Type,
      ProvinceID: params.ProvinceID,
      ProvinceTitle: params.ProvinceTitle,
      ProvinceSlug: params.ProvinceSlug,
      LocationID: params.LocationID,
      LocationTitle: params.LocationTitle,
      LocationSlug: params.LocationSlug,
    };
    const { pathname, query } = buildPropertyUrl(category, locationParams);
    breadcrumbs.push({
      label: params.LocationTitle,
      href: { pathname, query },
    });
  }

  // Add Area (District) - no link for last item
  if (params?.AreaTitle) {
    breadcrumbs.push({
      label: params.AreaTitle,
    });
  }

  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-2">
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;
          const label = index + 1 === breadcrumbs.length ? labelPrefix + " " + item.label : item.label;

          return (
            <li key={index} className="flex items-center gap-2">
              {index === 0 ? (
                // Home link with icon
                item.href ? (
                  <Link href={item.href} className="flex items-center gap-1 text-gray-600 hover:text-primary transition-colors">
                    <Home className="w-4 h-4" />
                    <span className="hidden sm:inline">{label}</span>
                  </Link>
                ) : (
                  <span className="flex items-center gap-1 text-gray-900 font-semibold">
                    <Home className="w-4 h-4" />
                    <span className="hidden sm:inline">{label}</span>
                  </span>
                )
              ) : (
                <>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                  {isLast || !item.href ? (
                    <span className="text-gray-900 font-semibold">{label}</span>
                  ) : (
                    <Link href={item.href} className="text-gray-600 hover:text-primary transition-colors">
                      {label}
                    </Link>
                  )}
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
