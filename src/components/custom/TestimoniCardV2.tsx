import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { TestimoniData } from "../../../types/testimoni-types";
import { formatDate } from "../../../utils/formatDate";

interface Props {
  isAgent?: boolean;
  isShowButton?: boolean;
  isFullText?: boolean;
  data: TestimoniData;
}

const TestimoniCardV2 = (props: Props) => {
  return (
    <div className="border border-gray-200 rounded-2xl shadow bg-white px-4 py-5 flex flex-col gap-4">
      {/* text */}
      <p className={cn("text-sm", !props.isFullText && "line-clamp-6")}>
        {props.data.Testimoni}
      </p>
      {/* profile */}
      <div className="flex flex-row gap-4">
        {/* photo */}
        {props.isAgent && props.data.Photo.Small && (
          <Image
            src={props.data.Photo.Small ?? "/empty.png"}
            alt={`${props.data.Nama} Photo`}
            width={0}
            height={0}
            sizes="100vw"
            className="w-14 h-14 rounded-full"
          />
        )}
        {/* info */}
        <div className="flex flex-col items-start">
          {/* name */}
          <h4
            className={cn(
              "font-bold text-sm mb-2",
              props.isAgent && "uppercase",
            )}
          >
            {props.data.Nama}
          </h4>
          {/* office */}
          {props.isAgent && <p className="text-xs">{props.data.Office?.Name ?? "-"}</p>}
          {/* location */}
          {props.data.Location && <p className="text-xs">{props.data.Location?.Title ?? '-'}</p>}
        </div>
      </div>
      {/* rating */}
      <div className="flex flex-row items-center justify-start gap-2">
        {/* stars */}
        {props.data.Star && (
        <div className="flex flex-row items-center gap-1">
          {Array.from({ length: props.data.Star }).map((_, i) => (
            <Image
              key={i}
              src="/star.svg"
              alt="Star"
              width="0"
              height="0"
              className="w-5 h-5"
            />
          ))}
        </div>
        )}
        {/* date */}
        {props.data.Created && (
          <p className="text-xs text-gray-600">{formatDate(props.data.Created, "id-ID", "long")}</p>
        )}
      </div>
      {/* button */}
      {props.isShowButton && (
        <Link href={`/testimoni/${props.isAgent ? "agen" : "klien"}`}>
          <Button
            variant="outline"
            className="w-full rounded-full font-semibold border-black"
          >
            Lihat Selengkapnya
          </Button>
        </Link>
      )}
    </div>
  );
};

export default TestimoniCardV2;
