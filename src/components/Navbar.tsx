"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={"fixed top-0 left-0 w-full z-50 transition-all duration-300 " + (scrolled ? "glassmorphism py-3 shadow-sm border-b border-border/50" : "bg-transparent py-6")}
    >
      <div className="container mx-auto px-6 max-w-6xl flex justify-between items-center">
        <Link
          href="#"
          className="font-serif text-2xl font-bold text-dark transition-colors duration-300"
        >
          Milan Farm Stay
        </Link>
        <div className="hidden md:flex gap-8">
          {["Plan", "Host", "Cook", "Help"].map((item) => (
            <Link
              key={item}
              href={"#" + item.toLowerCase()}
              className="font-medium transition-colors duration-300 hover:text-airbnb-coral text-text-main"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
