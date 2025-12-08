import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Agent } from "../../../types/agent-types";
import Link from "next/link";
import { removeBaseUrl } from "../../../utils/removeBaseUrl";

interface AgentCardProps {
  data?: Agent;
  Title?: string;
}

export default function AgentCard({ data }: AgentCardProps) {
  return (
    <div className="relative rounded-2xl bg-white shadow-lg border">
      {/* Right Logo */}
      <Image src="/logo_simple.svg" alt="Logo Simple" width="15" height="15" className="absolute top-2 right-2" />
      {/* Body */}
      <div className="flex flex-col p-4 gap-4 justify-between h-full">
        {/* Top */}
        <Link href={removeBaseUrl(data?.URLSegment ?? "#")} className="flex flex-row gap-3.5 items-start">
          {/* Picture */}
          <Image src={data?.Photo.MediumWebP ?? data?.Photo.Medium ?? "/empty.png"} alt="Agent Picture" width="96" height="96" className="rounded-full w-[80px] lg:w-[96px] h-[80px] lg:h-[96px]" />
          {/* Bio */}
          <div className="flex flex-col">
            {/* Name */}
            <h2 className="font-bold text-base lg:text-sm uppercase pb-1 flex flex-row items-center gap-1 flex-wrap">
              {data?.IsCRA === "1" ? data?.NameCRA : data?.Name}
              {data?.IsCRA === "1" && <Image src="/verified-cra.svg" alt="Verified" width="16" height="16" />}
            </h2>
            {/* Office */}
            <h3 className="text-xs">{data?.Office?.Name}</h3>
            {/* Position */}
            <p className="text-xs pb-1">({data?.Position})</p>
            {/* Location */}
            <p className="text-xs italic pb-1">{data?.Office?.LocationAndProvince}</p>
            {/* Awards */}
            <div className="hidden md:flex flex-row gap-1 min-h-[40px] items-start">
              {(data?.Badge?.length ?? 0) > 0 ? (
                data?.Badge!.map((d, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="flex flex-col items-center w-full h-full justify-between">
                      <Image src={d.Photo?.Medium ?? "/empty.png"} alt="Award Logo" width={30} height={30} />
                      <p className="text-label-lg text-center">{d.Title}</p>
                    </div>
                  </div>
                ))
              ) : (
                // Empty placeholder (invisible but keeps layout height)
                <div className="w-[30px] h-[30px]" />
              )}
            </div>
          </div>
        </Link>
        {/* Middle */}
        <div className="flex flex-row items-center gap-2">
          {/* Listing Counts */}
          <div className="flex-3 grid grid-cols-2 gap-2">
            {/* Jual */}
            <div className="flex flex-col bg-gray-50 gap-1 items-center px-1 py-2.5">
              <p className="font-bold text-sm lg:text-xs">{data?.TotalSell ?? 0}</p>
              <p className="text-xs lg:text-label-xl">Listing Jual</p>
            </div>
            {/* Sewa */}
            <div className="flex flex-col bg-gray-50 gap-1 items-center px-1 py-2.5">
              <p className="font-bold text-sm lg:text-xs">{data?.TotalRent ?? 0}</p>
              <p className="text-xs lg:text-[9px]">Listing Sewa</p>
            </div>
          </div>
          {/* WA Button */}
          <div className="flex-2">
            <Button size="sm" variant="whatsapp" className="px-2 w-full" asChild>
              <Link href={`https://wa.me/${data?.WAPhone}`} target="_blank" rel="noreferrer">
                <Image src="/whatsapp.svg" alt="Icon WhatsApp" width="15" height="17" className="invert w-4 h-auto" />
                <span className="hidden xs:inline-flex text-label-xl xs:text-xs font-bold">WhatsApp</span>
              </Link>
            </Button>
          </div>
        </div>
        {/* Info Button */}
        <Button asChild className="hidden md:flex items-center cursor-pointer font-bold px-1 py-3.5 bg-primary hover:text-gray-950 text-center rounded-xl text-xs">
          <Link href={removeBaseUrl(data?.URLSegment ?? "#")}>Lihat Info Agen</Link>
        </Button>
      </div>
    </div>
  );
}
