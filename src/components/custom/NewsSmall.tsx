import Image from "next/image";
import { ArticleItem } from "../../../types/article-types";
import { Button } from "../ui/button";
import Link from "next/link";

interface NewsSmallProps {
  data?: ArticleItem[];
}
export default function NewsSmall({ data }: NewsSmallProps) {
  const newsItems = data || [];

  const articleBaseURL = `/about/articles-all`;

  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      {/* Header */}
      <h2 className="text-xl font-bold text-gray-900">Brighton News</h2>

      <div className="w-1/4 border border-primary"></div>

      {/* News List */}
      <div className="space-y-4">
        {newsItems?.map((item, index) => (
          <Link href={`${articleBaseURL}/${item.URLSegment}`} key={index}>
            <div className="mt-4 group">
              <div className="flex flex-row gap-4 items-center">
                {/* Other Article Photo */}
                <div className="w-36 aspect-video overflow-hidden flex items-center justify-center rounded-md">
                  <Image
                    src={item.Photo?.SmallWebP ?? item.Photo?.Small ?? "/dummy-article-photo.jpg"}
                    alt={item.Photo?.Title ?? "Article Photo"}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-auto bg-center object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                {/* Article Title & Date */}
                <div className="flex-1 space-y-2">
                  <h3 className="text-sm font-bold line-clamp-3 group-hover:text-gray-600">{item.Title}</h3>
                  <p className="text-xs">{item.DateLabelArtikel}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer Link */}
      <div className="mt-6">
        <Link href="/about/articles-all">
          <Button variant="outline" className="font-semibold w-full">
            Lihat Semua
          </Button>
        </Link>
      </div>
    </div>
  );
}
