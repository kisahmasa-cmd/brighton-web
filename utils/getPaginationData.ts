interface PaginationDataParams {
  count: number;
  limit: number;
  page: number;
}

interface PaginationDataReturns {
  pages: number[];
  totalPages: number;
  startPage: number;
  endPage: number;
}

export const getPaginationData = (
  params: PaginationDataParams,
): PaginationDataReturns => {
  const total = params.count || 0;
  const totalPages = Math.ceil(total / params.limit);

  // Hitung halaman awal dan akhir yang akan ditampilkan
  const maxVisible = 5;
  let startPage = Math.max(1, params.page - Math.floor(maxVisible / 2));
  let endPage = startPage + maxVisible - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  return {
    pages,
    totalPages,
    startPage,
    endPage,
  };
};
