import { ButtonLink } from "@/components/ui/Button";
import styles from "./ProductNotFound.module.scss";

export const ProductNotFound = () => {
  return (
    <div className={styles.root} role="alert">
      <h1 className={styles.title}>Producto no encontrado</h1>
      <p className={styles.message}>El teléfono que buscas no existe o ya no está disponible.</p>
      <ButtonLink href="/">Volver al catálogo</ButtonLink>
    </div>
  );
};
