"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { highlightTargetElement } from "@/utils/highlightTarget";

export default function SearchTargetWatcher() {
  const pathname = usePathname();

  useEffect(() => {
    // Check if there is an active hash on route change or initial load
    const hash = window.location.hash;
    if (hash && hash.length > 1) {
      highlightTargetElement(hash.substring(1), 350);
    }

    // Listen to manual hashchange events
    const handleHashChange = () => {
      const currentHash = window.location.hash;
      if (currentHash && currentHash.length > 1) {
        highlightTargetElement(currentHash.substring(1), 100);
      }
    };

    // Listen to custom highlight dispatch
    const handleCustomHighlight = (e: Event) => {
      const customEvent = e as CustomEvent<{ id: string; delay?: number }>;
      if (customEvent.detail?.id) {
        highlightTargetElement(customEvent.detail.id, customEvent.detail.delay ?? 100);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("milan:highlight-element", handleCustomHighlight);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("milan:highlight-element", handleCustomHighlight);
    };
  }, [pathname]);

  return null;
}

