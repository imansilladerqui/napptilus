import type { StorageOption } from "@/types";
import { SelectorLabel } from "@/components/ui/SelectorLabel";
import styles from "./StorageSelector.module.scss";

type StorageSelectorProps = {
  options: StorageOption[];
  selected: StorageOption | null;
  onSelect: (option: StorageOption) => void;
};

export const StorageSelector = ({ options, selected, onSelect }: StorageSelectorProps) => {
  return (
    <div className={styles.root}>
      <SelectorLabel>Storage ¿How much space do you need?</SelectorLabel>
      <div className={styles.options} role="radiogroup" aria-label="How much space do you need?">
        {options.map((option) => {
          const isSelected = selected?.capacity === option.capacity;
          return (
            <button
              key={option.capacity}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={`${styles.option} ${isSelected ? styles.selected : ""}`}
              onClick={() => onSelect(option)}
            >
              {option.capacity}
            </button>
          );
        })}
      </div>
    </div>
  );
};
