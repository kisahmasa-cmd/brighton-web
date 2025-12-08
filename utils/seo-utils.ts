export function shouldNoIndex(url: string) {
  try {
    const u = new URL(url);

    // Semua query keys yang harus noindex
    const blockedParams = ["keyword", "Keyword", "Certificate", "Sort", "PriceMin", "PriceMax", "LTMin", "LTMax", "LBMin", "LBMax"];

    // 1. Jika mengandung query spesifik
    for (const key of blockedParams) {
      if (u.searchParams.has(key)) return true;
    }

    // 2. Pagination page >= 2
    const page = Number(u.searchParams.get("page"));
    if (!isNaN(page) && page >= 2) return true;

    return false;
  } catch (e) {
    return false;
  }
}
