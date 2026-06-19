import type { ColorOption } from "@/types";
import { SelectorLabel } from "@/components/ui/SelectorLabel";
import styles from "./ColorSelector.module.scss";

type ColorSelectorProps = {
  options: ColorOption[];
  selected: ColorOption | null;
  onSelect: (option: ColorOption) => void;
};

export const ColorSelector = ({ options, selected, onSelect }: ColorSelectorProps) => {
  return (
    <div className={styles.root}>
      <SelectorLabel>Color. Pick your favourite.</SelectorLabel>
      <div className={styles.options} role="radiogroup" aria-label="Pick your favourite colour">
        {options.map((option) => {
          const isSelected = selected?.name === option.name;
          return (
            <button
              key={option.name}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={styles.option}
              onClick={() => onSelect(option)}
              aria-label={option.name}
            >
              <span
                className={`${styles.swatch} ${isSelected ? styles.selected : ""}`}
                style={{ backgroundColor: option.hexCode ?? "#ccc" }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
