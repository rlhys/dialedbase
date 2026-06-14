// Money is integer cents end-to-end. Convert at the UI edge only.

export const centsToDollars = (cents) => (Number(cents || 0) / 100);
export const dollarsToCents = (dollars) => Math.round(Number(dollars || 0) * 100);

export const formatMoney = (cents, currency = "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency }).format(centsToDollars(cents));

// Compact for big KPI numbers, e.g. $12.4k
export const formatMoneyCompact = (cents, currency = "USD") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(centsToDollars(cents));

export const formatDate = (iso) => {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return "—";
  }
};

export const formatMonth = (iso) => {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-US", { month: "short", year: "2-digit" });
  } catch {
    return "";
  }
};
