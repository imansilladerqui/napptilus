import type { FormatPriceOptions } from "@/lib/formatPrice/formatPrice.types";

export const formatPrice = (amount: number, options?: FormatPriceOptions): string => {
  const numeric = new Intl.NumberFormat(options?.locale ?? "es-ES", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  const currency = options?.currency ?? "EUR";

  return `${numeric} ${currency}`;
};
