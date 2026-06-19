"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export const useSimilarProductsCarousel = () => {
  const trackRef = useRef<HTMLUListElement>(null);
  const [thumbRatio, setThumbRatio] = useState(1);
  const [offsetRatio, setOffsetRatio] = useState(0);

  const updateProgress = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const { scrollWidth, clientWidth, scrollLeft } = track;
    const maxScroll = scrollWidth - clientWidth;

    setThumbRatio(scrollWidth > 0 ? clientWidth / scrollWidth : 1);
    setOffsetRatio(maxScroll > 0 ? scrollLeft / maxScroll : 0);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateProgress();
    track.addEventListener("scroll", updateProgress, { passive: true });

    const resizeObserver = new ResizeObserver(updateProgress);
    resizeObserver.observe(track);

    return () => {
      track.removeEventListener("scroll", updateProgress);
      resizeObserver.disconnect();
    };
  }, [updateProgress]);

  return { trackRef, thumbRatio, offsetRatio };
};
