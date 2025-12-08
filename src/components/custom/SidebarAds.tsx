import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function SidebarAds() {
  return (
    <div className="flex flex-col gap-9">
      {/* Banner */}
      <Image
        src="https://dummyimage.com/300/ddd/fff/"
        alt="Banner 1"
        width={0}
        height={0}
        sizes="100vw"
        className="w-full"
      />
      {/* Show on Mobile Only */}
      <div className="lg:hidden flex flex-col px-4">
        <p className="text-center text-xl font-bold p-2">
          Jangan Lewatkan Program Menarik Dari Brighton!
        </p>
        <Image
          src="https://dummyimage.com/300/ddd/fff/"
          alt="Banner 2"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full rounded-xl"
        />
      </div>
      {/* Call To Action */}
      <div className="p-4 flex flex-col bg-primary">
        <p className="text-center text-xl font-bold pb-4">
          Butuh bantuan seputar titip atau cari properti?
        </p>
        <Button variant="secondary" className="font-bold">
          Hubungi Customer Service Brigita
        </Button>
      </div>
    </div>
  );
}
