type MonthType =
  | "short"
  | "numeric"
  | "2-digit"
  | "long"
  | "narrow"
  | undefined;

export function formatDate(
  dateStr?: string,
  locale?: string,
  monthType?: MonthType,
): string {
  if (!dateStr) return "";

  const date = new Date(dateStr.replace(" ", "T"));

  return date
    .toLocaleDateString(locale ?? "en-GB", {
      day: "2-digit",
      month: monthType ?? "short",
      year: "numeric",
    })
    .replace(",", ""); // hilangkan koma jika ada
}
