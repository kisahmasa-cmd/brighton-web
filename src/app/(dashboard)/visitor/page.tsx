import { getUserInfo } from "@/actions/user-action";
import { Metadata } from "next";
import { Building2, MapPin } from 'lucide-react';
import Image from "next/image";
import {getSecondaryNew} from "@/services/homepage-service/secondary-new-service";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import CardPropertySecondary from "@/components/custom/CardPropertySecondary";
import { getLastViewedProperties } from "@/services/property-service";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard Public Member",
};

// You can fetch this from API or database
const lastViewedProperties = [
  {
    id: 1,
    name: 'Modern Downtown Apartment',
    price: '$450,000',
    location: 'Manhattan, NY',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    name: 'Luxury Beach House',
    price: '$1,200,000',
    location: 'Malibu, CA',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop'
  },
  {
    id: 3,
    name: 'Cozy Suburban Home',
    price: '$325,000',
    location: 'Austin, TX',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop'
  }
];

const VisitorDashboardPage = async () => {
  const user = await getUserInfo();
  if (!user) return <div>No data user.</div>;

  // const recentProperties = await getLastViewedProperties(user.ExternalID);
  const recentProperties = await getSecondaryNew();
  const recentPropertiesData = recentProperties?.Data;

  return (
    <div>
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Selamat datang kembali, {user.Name}! 👋
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          Berikut adalah halaman dashboard untuk mengelola akun Anda.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-yellow-600" />
          Properti terakhir dilihat
        </h2>
        <div className="w-full">
          {recentPropertiesData && recentPropertiesData.length > 0 ? (
            <Carousel
              opts={{
                align: "start",
              }}
            >
              <CarouselContent>
                {recentPropertiesData.map((data, index) => (
                  <CarouselItem key={index} className="basis-full sm:basis-1/2 lg:basis-1/3 pb-4">
                    <CardPropertySecondary data={data}></CardPropertySecondary>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0 -translate-x-1/2 cursor-pointer shadow-lg"/>
              <CarouselNext className="right-0 translate-x-1/2 cursor-pointer shadow-lg"/>
            </Carousel>
          ) : (
            <div className="flex flex-col justify-center px-6 py-4 bg-white rounded-2xl">
              <p className="text-gray-500 text-lg">Belum ada properti yang Anda lihat</p>
              <Link
                href={"/"}
                className="text-gray-400 text-sm mt-2 cursor-pointer">
                Cari properti yang sesuai dengan pilihan Anda.
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisitorDashboardPage;
