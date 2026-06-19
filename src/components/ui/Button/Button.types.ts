import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { LinkProps } from "next/link";

export type ButtonVariant = "primary" | "secondary";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
};

export type ButtonLinkProps = LinkProps & {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
};
