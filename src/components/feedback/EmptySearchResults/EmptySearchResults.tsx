import type { EmptySearchResultsProps } from "@/components/feedback/EmptySearchResults/EmptySearchResults.types";
import styles from "./EmptySearchResults.module.scss";

export const EmptySearchResults = ({ query }: EmptySearchResultsProps) => {
  return (
    <div className={styles.root} role="status">
      <p className={styles.title}>No se encontraron resultados</p>
      <p className={styles.message}>
        No hay teléfonos que coincidan con &quot;{query}&quot;. Prueba con otro término.
      </p>
    </div>
  );
};
