"use client";

import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  Share2,
  Check,
  Copy,
  X,
  Coffee,
  UtensilsCrossed,
  Car,
  Compass,
  ExternalLink,
} from "lucide-react";

interface PageShareButtonProps {
  className?: string;
  customTitle?: string;
  customUrl?: string;
}

const PRODUCTION_DOMAIN = "https://milan-farm-stay.vercel.app";

export default function PageShareButton({
  className = "",
  customTitle,
  customUrl,
}: PageShareButtonProps) {
  const t = useTranslations("PageShare");
  const pathname = usePathname() || "/";

  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      if (typeof window !== "undefined") {
        if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
          setCanNativeShare(true);
        }
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Determine current active URL
  const getActiveUrl = useCallback(() => {
    if (customUrl) return customUrl;
    if (typeof window === "undefined") {
      return `${PRODUCTION_DOMAIN}${pathname === "/" ? "" : pathname}`;
    }

    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    ) {
      // For localhost, default to live link so guests can open on their mobile devices
      return `${PRODUCTION_DOMAIN}${pathname === "/" ? "" : pathname}`;
    }

    return window.location.href;
  }, [customUrl, pathname]);

  // Page-specific details
  const getPageInfo = useCallback(() => {
    if (pathname.includes("/order-coffee")) {
      return {
        title: customTitle || t("pageCoffee"),
        icon: <Coffee className="w-4.5 h-4.5 text-[#4A3B2C] dark:text-[#d4a373]" />,
        iconBg: "bg-[#4A3B2C]/10 dark:bg-[#d4a373]/20",
        shareText: (url: string) => t("coffeeShareText", { url }),
      };
    }
    if (pathname.includes("/order-food")) {
      return {
        title: customTitle || t("pageFood"),
        icon: <UtensilsCrossed className="w-4.5 h-4.5 text-emerald-600 dark:text-emerald-400" />,
        iconBg: "bg-emerald-500/10 dark:bg-emerald-500/20",
        shareText: (url: string) => t("foodShareText", { url }),
      };
    }
    if (pathname.includes("/rentals")) {
      return {
        title: customTitle || t("pageRentals"),
        icon: <Car className="w-4.5 h-4.5 text-emerald-700 dark:text-emerald-300" />,
        iconBg: "bg-emerald-600/10 dark:bg-emerald-600/20",
        shareText: (url: string) => t("rentalsShareText", { url }),
      };
    }
    return {
      title: customTitle || t("pageHome"),
      icon: <Compass className="w-4.5 h-4.5 text-airbnb-coral" />,
      iconBg: "bg-airbnb-coral/10",
      shareText: (url: string) => t("homeShareText", { url }),
    };
  }, [pathname, customTitle, t]);

  const activeUrl = mounted ? getActiveUrl() : `${PRODUCTION_DOMAIN}${pathname}`;
  const pageInfo = getPageInfo();

  // Close modal on Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleCopyLink = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(activeUrl);
      } else {
        const input = document.createElement("input");
        input.value = activeUrl;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const handleWhatsAppShare = () => {
    const text = pageInfo.shareText(activeUrl);
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;

    if (typeof window !== "undefined") {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        window.location.href = whatsappUrl;
      } else {
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      }
    }
    setIsOpen(false);
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: pageInfo.title,
          text: pageInfo.shareText(activeUrl),
          url: activeUrl,
        });
        setIsOpen(false);
      } catch (err) {
        if ((err as Error)?.name !== "AbortError") {
          console.log("Error sharing:", err);
        }
      }
    }
  };

  return (
    <div className="relative shrink-0">
      {/* Trigger Button: Styled to seamlessly match ThemeToggle */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={t("shareWithGuest")}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        title={t("shareWithGuest")}
        className={`relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full transition-all shrink-0 cursor-pointer ${
          isOpen
            ? "bg-stone-200/80 dark:bg-white/15 border-airbnb-coral/50 text-airbnb-coral"
            : "bg-transparent text-text-main border border-border/60 hover:border-border hover:text-airbnb-coral"
        } focus:outline-none focus:ring-2 focus:ring-airbnb-coral/50 ${className}`}
      >
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.div
              key="check"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="text-emerald-600 dark:text-emerald-400"
            >
              <Check className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="share"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Share2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Share Modal Portal: Rendered directly to document.body to avoid header backdrop-blur containing block bugs */}
      {mounted &&
        typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <div
                className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-3 sm:p-4"
                role="dialog"
                aria-modal="true"
                aria-label={t("shareWithGuest")}
              >
                {/* Backdrop Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  onClick={() => setIsOpen(false)}
                  className="fixed inset-0 bg-black/60 backdrop-blur-xs"
                  aria-hidden="true"
                />

                {/* Modal Card: Centered on desktop, bottom sheet on mobile */}
                <motion.div
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 24, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="relative w-full max-w-sm rounded-3xl bg-warm-white dark:bg-[#1A1A1A] border border-stone-200/90 dark:border-white/10 shadow-2xl p-4 sm:p-5 text-text-main z-10"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-border/60">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-xl ${pageInfo.iconBg} flex items-center justify-center shrink-0 shadow-2xs`}
                      >
                        {pageInfo.icon}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-sm sm:text-base text-dark dark:text-white leading-tight">
                          {t("shareWithGuest")}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-text-muted truncate max-w-[210px]">
                          {pageInfo.title}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      aria-label={t("close")}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-text-muted hover:text-dark dark:hover:text-white hover:bg-stone-200/60 dark:hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-3.5 flex flex-col gap-2.5">
                    {/* Primary: WhatsApp Share */}
                    <button
                      type="button"
                      onClick={handleWhatsAppShare}
                      className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm shadow-md shadow-[#25D366]/25 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                    >
                      <svg
                        className="w-4.5 h-4.5 fill-current shrink-0"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      <span>{t("shareOnWhatsapp")}</span>
                    </button>

                    {/* Secondary: Copy Link Row */}
                    <div className="flex items-center gap-2 p-1.5 bg-stone-100 dark:bg-white/5 rounded-2xl border border-stone-200/80 dark:border-white/10">
                      <input
                        type="text"
                        readOnly
                        value={activeUrl}
                        className="bg-transparent text-xs text-text-muted px-2.5 py-1.5 w-full focus:outline-none select-all font-mono truncate"
                        aria-label="Page URL"
                      />
                      <button
                        type="button"
                        onClick={handleCopyLink}
                        className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                          copied
                            ? "bg-emerald-600 text-white shadow-xs"
                            : "bg-white dark:bg-white/10 text-dark dark:text-white hover:bg-stone-200 dark:hover:bg-white/20 shadow-2xs"
                        }`}
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>{t("copied")}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>{t("copyLink")}</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Tertiary: Native Device Share (if supported) */}
                    {canNativeShare && (
                      <button
                        type="button"
                        onClick={handleNativeShare}
                        className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-medium text-text-muted hover:text-dark dark:hover:text-white hover:bg-stone-100 dark:hover:bg-white/5 border border-border/40 transition-colors cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>{t("moreOptions")}</span>
                      </button>
                    )}
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
