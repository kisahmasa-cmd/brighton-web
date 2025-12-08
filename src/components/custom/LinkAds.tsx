import Image from "next/image";
import Link from "next/link";

interface LinkAdsProps {
  imageURL: string | undefined | null;
  imageAlt?: string;
  linkURL: string | undefined | null;
}

const LinkAds = ({ imageURL, imageAlt, linkURL }: LinkAdsProps) => {
  if (!imageURL) return <div></div>;
  return (
    <Link href={linkURL ?? "#!"} target="_blank" rel="noopener noreferrer">
      <Image
        src={imageURL ?? "/empty.png"}
        alt={imageAlt ?? "Ads Image"}
        width={0}
        height={0}
        sizes="100vw"
        className="w-full object-contain"
      />
    </Link>
  );
};

export default LinkAds;
