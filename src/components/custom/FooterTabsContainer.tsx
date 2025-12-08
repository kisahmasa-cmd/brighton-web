"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { TabsFooterData } from "../../../types/footer-types";
import FooterTabs from "./FooterTabs";
import { getFooterTabsAction } from "@/actions/footer-action";
import { PropertyParams } from "../../../types/property-types";
import { buildPropertySlug } from "../../../utils/buildPropertySlug";

interface FooterTabsContainerProps {
  initialData: TabsFooterData;
}

export default function FooterTabsContainer({ initialData }: FooterTabsContainerProps) {
  const [data, setData] = useState<TabsFooterData>(initialData);
  const [activeTab, setActiveTab] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const pathname = usePathname();

  // ✅ Fungsi untuk memuat data tab sesuai URL saat ini
  const fetchFooterData = async (tabIndex: number) => {
    setIsLoading(true);
    try {
      const segments = pathname.split("/").filter(Boolean);
      const typeTransaction = segments[0] === "dijual" ? "Jual" : segments[0] === "disewa" ? "Sewa" : segments[0] === "dijualsewa" ? "JualSewa" : "";
      const dataParams = segments.slice(1);
      const search: PropertyParams = {};
      const { enhancedParams } = await buildPropertySlug(search, dataParams);

      const newData = await getFooterTabsAction(tabIndex, enhancedParams.ProvinceTitle, enhancedParams.LocationTitle, enhancedParams.Type, typeTransaction, enhancedParams.AreaTitle);

      if (newData && newData.Data) {
        setData(newData.Data);
      }
    } catch (error) {
      console.error("Gagal memuat data tab:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Reload otomatis ketika URL berubah
  useEffect(() => {
    fetchFooterData(activeTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleTabChange = async (tabIndex: number) => {
    if (tabIndex === activeTab) return;
    setActiveTab(tabIndex);
    await fetchFooterData(tabIndex);
  };

  return <FooterTabs data={data} activeTab={activeTab} onTabChange={handleTabChange} isLoading={isLoading} />;
}
