import Image from "next/image";
import { Button } from "../ui/button";

interface ImageWithButtonProps {
  Title?: string;
  BtnTitle?: string;
  Img?: string;
  Variant?: "default" | "link" | "whatsapp" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
  Size?: "default" | "xs" | "sm" | "lg" | "icon" | null | undefined;
}

export default function ImageWithButton({ Title, BtnTitle, Img, Variant, Size }: ImageWithButtonProps) {
  return (
    <section className="w-full hfull flex flex-col justify-center container mx-auto">
      <Image src={Img ?? "https://www.brighton.co.id/themes/v7/img/logo-bank-website-brighton-v2.webp"} alt="Banner" width={1920} height={420} priority className="w-full h-auto" />
      <div className="flex flex-col w-full gap-4 text-center justify-center md:mt-4 mt-2">
        <div className="font-bold text-lg md:text-xl">{Title ?? "Informasi Lebih Lanjut!"}</div>
        <a href={`https://wa.me/${6281234567890}`} target="_blank" rel="noreferrer">
          <Button size={Size ?? "sm"} variant={Variant ?? "whatsapp"} className="w-auto p-0 px-2 md:px-4 lg:px-2">
            <Image src="/whatsapp.svg" alt="Icon WhatsApp" width="20" height="40" className="invert w-4 h-auto" />
            <span className="inline-flex text-sm md:text-lg font-bold">{BtnTitle ?? "Hubungi Kami"}</span>
          </Button>
        </a>
      </div>
    </section>
  );
}
