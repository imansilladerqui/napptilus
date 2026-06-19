import { Button } from "@/components/ui/Button";
import styles from "./AddToCartButton.module.scss";

type AddToCartButtonProps = {
  disabled: boolean;
  onClick: () => void;
};

export const AddToCartButton = ({ disabled, onClick }: AddToCartButtonProps) => {
  if (disabled) {
    return (
      <button type="button" className={styles.buttonDisabled} disabled aria-disabled>
        Añadir
      </button>
    );
  }

  return (
    <Button type="button" className={styles.button} onClick={onClick}>
      Añadir
    </Button>
  );
};
