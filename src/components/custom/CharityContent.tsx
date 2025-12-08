import { cn } from "@/lib/utils";
import React from "react";
import { CharityCategoryData } from "../../../types/charity-types";
import Image from "next/image";

interface CharityContentProps {
  categories: CharityCategoryData[];
}

export default function CharityContent({ categories }: CharityContentProps) {
  return (
    <div>
      {/* title */}
      <h2 className="font-bold text-xl py-4">Apa itu Brighton Peduli?</h2>
      {/* description */}
      <p>
        Brighton Peduli hadir untuk mewujudkan mimpi bersama. Dibalik setiap
        transaksi Anda di Brighton, terdapat kepedulian yang tertanam untuk
        membantu saudara kita yang membutuhkan.
      </p>
      <p>
        Bersama Brighton Peduli, Anda bukan hanya membeli ataupun menjual
        hunian, tapi juga turut membagi kebahagiaan. Ada bagian dari Brighton
        yang didonasikan untuk membantu saudara-saudara kita dalam hal
        pengobatan kanker, pendidikan, dan kebutuhan sembako.
      </p>
      {/* category header */}
      <h2 className="font-bold text-xl pt-4">Kategori Bantuan</h2>
      {/* category counts */}
      <div
        className={cn(
          "grid grid-cols-1 gap-4 py-6",
          categories.length > 1 && "sm:grid-cols-2",
          categories.length > 2 && "md:grid-cols-3",
        )}
      >
        {categories.map((category, index) => (
          <CharityCategoryBox
            key={index}
            icon={category.Icon.Small ?? "/empty.png"}
            count={category.Count}
            label={category.Title}
            className={
              index === categories.length - 1 && categories.length > 2
                ? "sm:col-span-2 md:col-span-1"
                : ""
            }
          />
        ))}
      </div>
    </div>
  );
}

function CharityCategoryBox({
  icon,
  count,
  label,
  className,
}: {
  icon: string;
  count: number;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "p-4 flex flex-row md:flex-col items-center gap-4 border-2 border-primary w-full",
        className,
      )}
    >
      <Image
        src={icon}
        alt={`${label} Icon`}
        width={0}
        height={0}
        sizes="100vw"
        className="w-9 h-9"
      />
      <div>
        <h4 className="font-semibold md:text-center">{count} Penerima</h4>
        <p className="text-xs md:text-center">
          Bantuan <span className="font-semibold">{label}</span>
        </p>
      </div>
    </div>
  );
}
