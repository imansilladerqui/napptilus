import Link from "next/link";
import type { ButtonLinkProps } from "@/components/ui/Button/Button.types";
import styles from "./Button.module.scss";

export const ButtonLink = ({
  variant = "secondary",
  className,
  children,
  ...props
}: ButtonLinkProps) => {
  const classes = [styles[variant], className].filter(Boolean).join(" ");

  return (
    <Link className={classes} {...props}>
      {children}
    </Link>
  );
};
