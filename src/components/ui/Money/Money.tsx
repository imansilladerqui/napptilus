import { formatPrice } from "@/lib/formatPrice";
import type { MoneyProps } from "@/components/ui/Money/Money.types";

export const Money = ({ amount, className, currency, locale }: MoneyProps) => {
  return <span className={className}>{formatPrice(amount, { currency, locale })}</span>;
};
