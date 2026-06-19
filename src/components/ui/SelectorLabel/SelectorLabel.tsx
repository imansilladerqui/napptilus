import type { SelectorLabelProps } from "@/components/ui/SelectorLabel/SelectorLabel.types";
import styles from "./SelectorLabel.module.scss";

export const SelectorLabel = ({ children }: SelectorLabelProps) => {
  return <div className={styles.label}>{children}</div>;
};
