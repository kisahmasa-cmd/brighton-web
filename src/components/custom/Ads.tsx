import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Ads() {
  return (
    <div className="flex flex-col items-center">
      {/* Text */}
      <p className="text-center text-xl font-bold mb-4">
        Jangan Lewatkan Program Menarik Dari Brighton!
      </p>
      {/* Banner */}
      <Image
        src="https://dummyimage.com/1200x240/ddd/fff/"
        alt="Ads Banner"
        width={0}
        height={0}
        sizes="100vw"
        className="w-full"
      />
      {/* Text */}
      <p className="text-center text-xl font-bold my-4">
        Masih butuh info lain atau bantuan seputar jual, sewa, cari properti?
      </p>
      {/* CS Button */}
      <Button variant="secondary">Hubungi Customer Service Brigita</Button>
    </div>
  );
}
