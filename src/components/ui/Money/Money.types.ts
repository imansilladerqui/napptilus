import type { FormatPriceOptions } from "@/lib/formatPrice";

export type MoneyProps = {
  amount: number;
  className?: string;
} & FormatPriceOptions;
