import { FooterTypes } from "../../../types/footer-types";
import { getFooterTabs, getIcons } from "@/services/homepage-service/homepage-service";
import Image from "next/image";
import FooterTabsContainer from "./FooterTabsContainer";
import { SocialMediaData } from "../../../types/social-icons";
import { removeBaseUrl } from "../../../utils/removeBaseUrl";
import { getCurrentSlug } from "../../../utils/getCurrentSlug";
import { buildPropertySlug } from "../../../utils/buildPropertySlug";
import { PropertyParams } from "../../../types/property-types";
import { DEFAULT_RESPONSE } from "@/data/default-response";

interface FooterProps {
  data?: FooterTypes[];
  dataIcons?: SocialMediaData[];
}

export default async function Footer({ data, dataIcons }: FooterProps) {
  const { segments } = await getCurrentSlug();
  const typeTransaction = segments[0] === "dijual" ? "Jual" : segments[0] === "disewa" ? "Sewa" : segments[0] === "dijualsewa" ? "JualSewa" : "";
  const dataParams = segments.slice(1);
  const search: PropertyParams = {};
  const { enhancedParams } = await buildPropertySlug(search, dataParams);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const safe = async (fn: any, ...args: any[]) => {
    try {
      return await fn(...args);
    } catch (e) {
      console.error("API ERROR:", e);
      return DEFAULT_RESPONSE;
    }
  };
  const dataFooterTabs = await safe(getFooterTabs, 1, enhancedParams.ProvinceTitle, enhancedParams.LocationTitle, enhancedParams.Type, typeTransaction, enhancedParams.AreaTitle);
  return (
    <footer className="bg-footer text-white pt-12 pb-6">
      <div className="mx-auto px-10">
        {/* Property Tabs - Client Component */}
        <FooterTabsContainer initialData={dataFooterTabs.Data === undefined ? [] : dataFooterTabs.Data} />
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            {/* Social Media & Certifications */}
            <div className="flex flex-col w-full md:w-auto items-start sm:items-center gap-6 lg:gap-8">
              {/* Social Icons */}
              <div className="flex items-center mx-auto md:mx-0 gap-4">
                {dataIcons?.map((data) => (
                  <a href={data.URL} aria-label="Social Media" className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors" key={data.Title}>
                    <Image width={32} height={32} src={data?.Photo.SmallWebP ?? data?.Photo?.Small ?? "/empty.png"} alt="icons" className="rounded-full" />
                  </a>
                ))}
              </div>

              {/* Certification Badges */}
              <div className="flex items-center gap-3 md:w-auto w-full justify-center md:justify-start">
                <div className="w-12 h-12 rounded-full flex items-center justify-center relative">
                  <Image alt="popular-brand-logo" src="/footer-icon/popular-brand.webp" fill className="object-contain" />
                </div>
                <div className="w-12 h-12 rounded-full flex items-center justify-center relative">
                  <Image alt="award-logo" src="/footer-icon/awards.webp" fill className="object-contain" />
                </div>
                <div className="w-12 h-12 rounded flex items-center justify-center relative">
                  <Image alt="iso" src="/footer-icon/iso.webp" fill className="object-contain" />
                </div>
                <div className="w-12 h-12 rounded flex items-center justify-center relative">
                  <Image alt="muri" src="/footer-icon/muri.webp" fill className="object-contain" />
                </div>
                <div className="w-16 h-12 rounded flex items-center justify-center relative">
                  <Image alt="fast-loan" src="/footer-icon/fast-loan.webp" fill className="object-contain" />
                </div>
              </div>
            </div>

            {/* Footer Links & Copyright */}
            <div className="flex flex-col items-start lg:items-center gap-4 w-full text-center mx-auto">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-sm text-center w-full justify-center">
                {data?.map((link, index) => (
                  <span key={index} className="flex items-center">
                    <a href={removeBaseUrl(link.Url)} className="hover:text-white transition-colors">
                      {link.Title}
                    </a>
                    {index < data.length - 1 && <span className="ml-4 text-gray-600"></span>}
                  </span>
                ))}
              </div>
              <p className="text-sm text-white text-center w-full">© 2025 Brighton. Hak cipta dilindungi.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
