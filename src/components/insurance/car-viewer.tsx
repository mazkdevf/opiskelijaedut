"use client";

import { useEffect, useRef } from "react";

export function CarViewer({ label }: { label: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    let unmount: (() => void) | undefined;

    import("@/components/insurance/car-scene")
      .then(({ mountCarScene }) => {
        if (!cancelled) unmount = mountCarScene(container);
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
      unmount?.();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={label}
      className="aspect-[4/3] w-full cursor-grab touch-pan-y select-none active:cursor-grabbing sm:aspect-[16/10]"
    />
  );
}
