import Image from "next/image";

interface WrapperImageProps {
  Title?: string;
  imgUrl: string;
  imgAlt: string;
}

export default function WrapperImage({
  Title,
  imgUrl,
  imgAlt,
}: WrapperImageProps) {
  return (
    <div className="relative w-full h-48 md:h-64 lg:h-80 overflow-hidden rounded-2xl">
      {/* Background Image */}
      <Image src={imgUrl} alt={imgAlt} fill className="object-cover" priority />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Text Content */}
      <div className="relative h-full flex items-center justify-center px-4">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white text-center drop-shadow-lg">
          {Title}
        </h1>
      </div>
    </div>
  );
}
