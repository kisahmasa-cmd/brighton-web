import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { getWACSNumber } from "../../../utils/getWA";

export default function CharityDetail() {
  return (
    <div>
      {/* contact */}
      <div className="p-6 flex flex-col gap-4 items-center bg-primary">
        <h2 className="font-bold text-center text-2xl">Butuh Informasi Lebih Lanjut Tentang Brighton Peduli?</h2>
        <Link href={`https://wa.me/${getWACSNumber()}?text=Hai,%20saya%20mau%20bertanya%20mengenai%20Brighton`} target="_blank">
          <Button variant="secondary" size="lg">
            <Image src="/whatsapp.svg" alt="Icon WhatsApp" width="15" height="17" className="invert w-4 h-auto" />
            <span className="font-bold">WA Brigita Customer Service</span>
          </Button>
        </Link>
      </div>
      {/* detail */}
      <div className="py-6">
        <h2 className="font-bold text-2xl">Seputar Brighton Peduli</h2>
        <p className="font-bold">Donasi Brighton Peduli telah tersalurkan kepada:</p>
        <ul className="list-disc pl-8 pb-8">
          <li>Yayasan Peduli Kanker Anak Indonesia (YPKAI), Surabaya</li>
          <li>Yayasan Kasih Anak Kanker Indonesia (YKAKI), Surabaya</li>
          <li>Yayasan Kanker Indonesia (YKI), Surabaya</li>
          <li>Malaikat Tanpa Sayap, Komunitas Survivor Kanker</li>
          <li>Panti Asuhan Tabita, Kab. Malang</li>
          <li>Warga Desa Dawuhan, Sengon, Kab. Pasuruan</li>
          <li>Panti Asuhan Dorkas, Porong, Sidoarjo</li>
        </ul>
        <p>Mari jadikan setiap transaksi Anda di Brighton sebagai langkah nyata untuk Bersama #WujudkanMimpi.</p>
        <p>Brighton Peduli</p>
        <p className="font-bold">Bersama, #WujudkanMimpi</p>
      </div>
    </div>
  );
}
