"use client";

import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { PropertyParams } from "../../../types/property-types";

interface PaginationButtonProps {
  page: number;
  pages: number[];
  totalPages: number;
  startPage: number;
  endPage: number;
  params?: PropertyParams | undefined;
  hash?: string;
}

export default function PaginationButton({ page, pages, totalPages, startPage, endPage, params, hash }: PaginationButtonProps) {
  return (
    <>
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            {/* Previous */}
            <PaginationItem>
              <PaginationPrevious href={{ query: { ...params, page: page - 1 }, hash }} className={page === 1 ? "hidden" : ""} />
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
                <PaginationLink href={{ query: { ...params, page: p }, hash }} isActive={p === page} className={`border border-primary hover:bg-primary ${p === page ? "bg-primary text-white" : ""}`}>
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
              <PaginationNext href={{ query: { ...params, page: page + 1 }, hash }} className={page === totalPages ? "hidden" : ""} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
}
