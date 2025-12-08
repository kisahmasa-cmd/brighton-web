import React from "react";
import ConsignmentForm from "@/components/custom/ConsignmentForm";
import ConsignmentStep from "@/components/custom/ConsignmentStep";
import Image from "next/image";
import Link from "next/link";
import { getType } from "@/services/property-service";
import { getWACSNumber } from "../../../../utils/getWA";

const page = async () => {
  const dataPropertyType = await getType();

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
      <div className="relative container sm:max-w-7xl mx-auto px-4 lg:px-10">
        <div className="section-header flex flex-col items-center justify-center py-10 sm:py-16">
          <ConsignmentStep />
        </div>
        <div className="w-full grid sm:grid-cols-3 gap-6 sm:gap-8 pt-6 pb-10">
          <div className="relative w-full sm:col-span-2">
            <div id="containerAutoScroll" className="absolute -top-20 w-full opacity-0" />
            <ConsignmentForm propertyTypes={dataPropertyType.Data?.Type} />
          </div>
          <div className="sidebar w-full">
            {/* Section Iklan Dibawah Bisa Dijadikan Komponen Jika Perlu */}
            <div className="ads-care w-full mb-6 sm:mb-8">
              <Image src="https://cdn.brighton.co.id/Uploads/Images/10728310/2Mln439O/UP-ads-BP.webp" alt="Image Brighton Care" width="400" height="400" className="w-f" />
            </div>
            <div className="contact-help w-full min-h-50 bg-primary p-3 flex flex-col items-center justify-center gap-4">
              <p className="text-center text-xl font-extrabold">Butuh Bantuan Seputar Titip atau Cari Properti?</p>
              <Link
                href={`https://api.whatsapp.com/send?phone=${getWACSNumber()}&text=Hai%20,%20saya%20mau%20bertanya%20mengenai%20Brighton`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center rounded-md px-4 py-2 font-semibold text-sm bg-secondary text-secondary-foreground hover:bg-secondary/80 btn-contact-whatsapp"
              >
                Hubungi Customer Service Brigita
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
