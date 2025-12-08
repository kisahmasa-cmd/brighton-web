function formatAbbreviated(
  value: number,
  useFullSuffix = false,
  truncateInsteadOfRound = false
): string {
  let formatted: string;
  let suffix = "";

  const formatNumber = (num: number): string => {
    // default toFixed(2) -> rounding
    const raw = num * 100;
    const truncated = Math.floor(raw) / 100;
    const result = truncateInsteadOfRound ? truncated : num;
    return result.toFixed(2);
  };

  if (value >= 1_000_000_000_000) {
    const n = value / 1_000_000_000_000;
    suffix = useFullSuffix ? " Triliun" : " T";
    formatted = formatNumber(n);
  } else if (value >= 1_000_000_000) {
    const n = value / 1_000_000_000;
    suffix = useFullSuffix ? " Miliar" : " M";
    formatted = formatNumber(n);
  } else if (value >= 1_000_000) {
    const n = value / 1_000_000;
    suffix = useFullSuffix ? " Juta" : " JT";
    formatted = formatNumber(n);
  } else if (value >= 1_000) {
    const n = value / 1_000;
    suffix = useFullSuffix ? " Ribu" : " Ribu";
    formatted = formatNumber(n);
  } else {
    return value.toString();
  }

  formatted = formatted.replace(".", ",").replace(/,?0+$/, "");

  return `${formatted}${suffix}`;
}

export function formatCurrency(
  value: number | string,
  prefix: string = "Rp",
  useFullSuffix = false,
  truncateInsteadOfRound = false
): string {
  if (value === undefined || value === null || value === "") {
    return "Invalid input";
  }

  const valueStr = value.toString();

  // Handle range like "451000000 ~ 1000000000"
  if (valueStr.includes("~")) {
    const [startStr, endStr] = valueStr.split("~").map((v) => v.trim());
    const start = parseFloat(startStr.replace(/,/g, ""));
    const end = parseFloat(endStr.replace(/,/g, ""));
    if (!isNaN(start) && !isNaN(end)) {
      return `${prefix} ${formatAbbreviated(start, useFullSuffix, truncateInsteadOfRound)} ~ ${formatAbbreviated(
        end,
        useFullSuffix,
        truncateInsteadOfRound
      )}`;
    }
  }

  const numericValue =
    typeof value === "string" ? parseFloat(value.replace(/,/g, "")) : value;

  if (isNaN(numericValue)) {
    return "Invalid input";
  }

  return `${prefix} ${formatAbbreviated(numericValue, useFullSuffix, truncateInsteadOfRound)}`;
}

/**
 * Format number ke string currency penuh, misal:
 * 10967098.703888334 -> "Rp 10,967,099"
 */
export function formatCurrencyFull(value: number, prefix: string = "Rp"): string {
  if (isNaN(value)) return `${prefix} 0`;

  // Bulatkan ke integer terdekat (karena tidak mau ada desimal)
  const roundedValue = Math.round(value);

  // Format dengan pemisah ribuan koma (10,967,099)
  const formatted = roundedValue.toLocaleString("en-US");

  return `${prefix} ${formatted}`;
}
