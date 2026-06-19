"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { ChevronLeftIcon } from "@/components/ui/icons/ChevronLeftIcon";
import styles from "./BackButton.module.scss";

export const BackButton = () => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }

    router.push("/");
  }, [router]);

  return (
    <button type="button" className={styles.button} onClick={handleBack} aria-label="Back">
      <ChevronLeftIcon className={styles.icon} />
      <span className={styles.label}>Back</span>
    </button>
  );
};
