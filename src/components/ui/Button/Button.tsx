import type { ButtonProps } from "@/components/ui/Button/Button.types";
import styles from "./Button.module.scss";

export const Button = ({
  variant = "primary",
  className,
  type = "button",
  children,
  ...props
}: ButtonProps) => {
  const classes = [styles[variant], className].filter(Boolean).join(" ");

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
};
