import AgentCard from "@/components/custom/AgentCard";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { AgentDataResponse } from "@/services/agent-service";
import { AgentParams } from "../../../types/agent-types";
import { buildAgentPath } from "../../../utils/buildAgentPath";

interface AgentProps {
  agents?: AgentDataResponse;
  params?: AgentParams;
  citySlug?: string;
  officeSlug?: string;
}

export default async function AgentCardList({ agents, params, citySlug, officeSlug }: AgentProps) {
  const page = Number(params?.page) || 1;
  const limit = 12;
  const total = Number(agents?.Count) || 0;
  const totalPages = Math.ceil(total / limit);

  // Hitung halaman awal dan akhir yang akan ditampilkan
  const maxVisible = 5;
  let startPage = Math.max(1, page - Math.floor(maxVisible / 2));
  let endPage = startPage + maxVisible - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  const keyword = params?.Keyword ? `&Keyword=${params.Keyword}` : "";

  // Check if Latitude and Longitude exist and append them if they do
  const paramsNearby = params?.Latitude && params?.Longitude ? `&Latitude=${params.Latitude}&Longitude=${params.Longitude}` : "";

  // Construct the base path
  const basePath = buildAgentPath(citySlug, officeSlug);

  // Combine basePath with the query string (including keyword, Latitude, Longitude)
  const buildHref = (pageNumber: number) => {
    return `${basePath}?page=${pageNumber}${keyword}${paramsNearby}`;
  };

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  return (
    <div className="flex flex-col gap-6">
      {/* Agents Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents?.Data?.map((item, index) => (
          <AgentCard data={item} key={index} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            {/* Previous */}
            <PaginationItem>
              <PaginationPrevious href={buildHref(page - 1)} className={page === 1 ? "hidden" : ""} />
            </PaginationItem>

            {/* Ellipsis sebelum */}
            {startPage > 1 && (
              <PaginationItem>
                <span className="px-2 text-gray-500">...</span>
              </PaginationItem>
            )}

            {/* Nomor halaman */}
            {pages.map((p) => (
              <PaginationItem key={p}>
                <PaginationLink href={buildHref(p)} isActive={p === page} className={`border border-primary hover:bg-primary ${p === page ? "bg-primary text-white" : ""}`}>
                  {p}
                </PaginationLink>
              </PaginationItem>
            ))}

            {/* Ellipsis sesudah */}
            {endPage < totalPages && (
              <PaginationItem>
                <span className="px-2 text-gray-500">...</span>
              </PaginationItem>
            )}

            {/* Next */}
            <PaginationItem>
              <PaginationNext href={buildHref(page + 1)} className={page === totalPages ? "hidden" : ""} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
