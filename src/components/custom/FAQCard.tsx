import Image from "next/image";
import Link from "next/link";

interface FAQCardProps {
  href: string;
  iconSrc: string;
  label: string;
}

export default function FAQCard(props: FAQCardProps) {
  return (
    <Link href={props.href} className="cursor-pointer">
      <div className="p-5 flex flex-col items-center gap-6 rounded-xl shadow-md border border-gray-200 h-full">
        <Image
          src={props.iconSrc}
          alt={props.label}
          width="0"
          height="0"
          sizes="100vw"
          className="w-auto h-28 md:h-14"
        />
        <p className="text-center text-sm flex-1">{props.label}</p>
      </div>
    </Link>
  );
}
