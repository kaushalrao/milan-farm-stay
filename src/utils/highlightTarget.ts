export function highlightTargetElement(elementIdOrSelector: string, delay: number = 100) {
  if (typeof window === "undefined" || !elementIdOrSelector) return;

  const cleanId = elementIdOrSelector.replace(/^[#/?]+/, "");

  setTimeout(() => {
    // 1. Try by exact ID
    let target = document.getElementById(cleanId);

    // 2. Try by selector if not found
    if (!target) {
      try {
        target = document.querySelector(elementIdOrSelector);
      } catch {
        // ignore invalid selector
      }
    }

    // 3. Try matching by data-stop-title or slug for itinerary stops
    if (!target && cleanId.startsWith("stop-")) {
      const slug = cleanId.replace(/^stop-/, "");
      target =
        Array.from(document.querySelectorAll<HTMLElement>(".stop-card")).find((el) => {
          const title = el.getAttribute("data-stop-title") || "";
          return title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug;
        }) || null;
    }

    // 4. Try matching food items by data attribute or title
    if (!target && cleanId.startsWith("food-")) {
      const slug = cleanId.replace(/^food-/, "");
      target =
        Array.from(document.querySelectorAll<HTMLElement>("[id^='food-']")).find((el) => {
          return el.id.toLowerCase().includes(slug);
        }) || null;
    }

    if (target) {
      // Smooth scroll with offset positioning
      target.scrollIntoView({ behavior: "smooth", block: "center" });

      // Apply highlight class
      target.classList.remove("search-highlight-target");
      void target.offsetWidth; // Force DOM reflow to restart CSS animation
      target.classList.add("search-highlight-target");

      // Clean up class after animation finishes
      setTimeout(() => {
        target?.classList.remove("search-highlight-target");
      }, 2600);
    }
  }, delay);
}

