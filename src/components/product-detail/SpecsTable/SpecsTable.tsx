import { TECH_SPEC_ROWS } from "@/components/product-detail/SpecsTable/SpecsTable.constants";
import type { SpecsTableProps } from "@/components/product-detail/SpecsTable/SpecsTable.types";
import styles from "./SpecsTable.module.scss";

export const SpecsTable = ({ brand, description, specs }: SpecsTableProps) => {
  const techRows = TECH_SPEC_ROWS.filter(({ key }) => Boolean(specs?.[key]));
  const hasMeta = Boolean(brand || description);
  const hasTech = techRows.length > 0;

  if (!hasMeta && !hasTech) return null;

  return (
    <section className={styles.root} aria-labelledby="specs-title">
      <h2 id="specs-title" className={styles.title}>
        Specifications
      </h2>
      <table className={styles.table}>
        <tbody>
          {brand && (
            <tr>
              <th scope="row">Brand</th>
              <td>{brand}</td>
            </tr>
          )}
          {description && (
            <tr>
              <th scope="row">Description</th>
              <td className={styles.descriptionCell}>{description}</td>
            </tr>
          )}
          {techRows.map(({ key, label }) => (
            <tr key={key}>
              <th scope="row">{label}</th>
              <td>{specs?.[key]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
