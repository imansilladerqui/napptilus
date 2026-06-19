import type { ProductSpecs } from "@/types";

export type SpecsTableProps = {
  brand?: string;
  description?: string;
  specs?: ProductSpecs;
};

export type SpecRow = {
  key: keyof ProductSpecs;
  label: string;
};
