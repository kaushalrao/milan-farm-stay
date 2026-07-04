"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  const { scrollY } = useScroll();
  
  // Interpolate values based on scroll position (0px to 50px)
  const paddingY = useTransform(scrollY, [0, 50], ["1.5rem", "0.75rem"]);
  const backgroundColor = useTransform(scrollY, [0, 50], ["rgba(252, 251, 248, 0)", "rgba(252, 251, 248, 0.9)"]);
  const backdropFilter = useTransform(scrollY, [0, 50], ["blur(0px)", "blur(12px)"]);
  const borderOpacity = useTransform(scrollY, [0, 50], [0, 1]);
  const logoScale = useTransform(scrollY, [0, 50], [1, 0.95]);

  return (
    <motion.nav
      style={{
        paddingTop: paddingY,
        paddingBottom: paddingY,
        backgroundColor,
        backdropFilter,
        WebkitBackdropFilter: backdropFilter,
      }}
      className="fixed top-0 left-0 w-full z-50 transition-shadow duration-300"
    >
      {/* Bottom border that fades in smoothly */}
      <motion.div 
        style={{ opacity: borderOpacity }}
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-border/50"
      />
      
      <div className="container mx-auto px-6 max-w-6xl flex justify-between items-center relative z-10">
        <Link href="#">
          <motion.div
            style={{ scale: logoScale, originX: 0, originY: 0.5 }}
            className="font-serif text-2xl font-bold text-dark transition-colors duration-300"
          >
            Milan Farm Stays
          </motion.div>
        </Link>
        <div className="hidden md:flex gap-8">
          {["Plan", "Host", "Cook", "Help"].map((item) => (
            <motion.div key={item} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={"#" + item.toLowerCase()}
                className="font-medium transition-colors duration-300 hover:text-airbnb-coral text-text-main"
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
