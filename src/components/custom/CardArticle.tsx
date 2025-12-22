import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { ArticleItem } from "../../../types/article-types";
import { saveActivityLog } from "@/services/activity-log-service";
import { useUser } from "./UserContext";

interface CardArticleProps {
  data?: ArticleItem;
  Title?: string;
}

export default function CardArticle(props: CardArticleProps) {
  const dataArticle = props.data;
  const userInfo = useUser();
  let articlePhoto = "/dummy-article-photo.jpg";

  if (dataArticle?.Photo) {
    articlePhoto = dataArticle?.Photo?.MediumWebP ?? dataArticle?.Photo?.Medium;
  }

  return (
    <Link
      href={`/about/articles-all/${dataArticle?.URLSegment ?? "#"}`}
      onClick={() => {
        saveActivityLog({
          Action: "View",
          UserID: userInfo?.UserID ?? "",
          UserName: userInfo?.Name ?? "",
          UserType: userInfo?.UserType === "AGEN" ? "Agent" : "Visitor",
          RefURL: `/about/articles-all/${dataArticle?.URLSegment ?? ""}`,
          RefID: dataArticle?.ID?.toString() ?? "",
          RefType: "ArticleData",
          ContactType: "Website",
          Source: "Website",
        });
      }}
      className="w-full block group relative rounded-2xl overflow-hidden shadow-lg h-full"
    >
      {dataArticle?.Category?.Name && <Badge className="absolute top-2 left-2.5 bg-primary text-black text-xs font-semibold uppercase rounded-full">{dataArticle?.Category?.Name}</Badge>}
      <Image src={articlePhoto} alt="Photo" width={1200} height={600} className="w-full aspect-2/1 object-cover" />

      <div className="p-4 pt-3 flex flex-col border border-gray-200 h-full">
        <p className="font-bold text-gray-900 line-clamp-2 mb-1 leading-5">{dataArticle?.Title}</p>
        <p className="text-xs text-gray-500 font-semibold mb-1">{dataArticle?.DateLabelArtikel}</p>
        <p className="text-sm text-gray-600 line-clamp-3 leading-4">{dataArticle?.Content.replace(/<[^>]+>/g, "").slice(0, 180)}</p>
      </div>
    </Link>
  );
}
