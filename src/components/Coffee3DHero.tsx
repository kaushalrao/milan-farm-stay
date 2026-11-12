"use client";

import React from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// SVG Coffee Bean component with roasted split fissure
function CoffeeBean({ className = "w-6 h-6", color = "#4A2E18" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={`beanGrad-${color}`} cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#7B4B28" />
          <stop offset="50%" stopColor={color} />
          <stop offset="100%" stopColor="#2A1508" />
        </radialGradient>
        <filter id="beanShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.35" />
        </filter>
      </defs>
      {/* Bean Body */}
      <path
        d="M20 4C29 4 36 11 36 20C36 29 29 36 20 36C11 36 4 29 4 20C4 11 11 4 20 4Z"
        fill={`url(#beanGrad-${color})`}
        filter="url(#beanShadow)"
      />
      {/* Center S-curve fissure */}
      <path
        d="M20 7C22 13 18 17 21 23C23 27 19 31 20 33"
        stroke="#1E0C04"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M21 9C22.5 14 19 18 21.5 23C23.5 27 20 30 20.8 32"
        stroke="#A0693B"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeOpacity="0.7"
      />
    </svg>
  );
}

export default function Coffee3DHero() {
  // Mouse tilt tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 120 };
  const rotateX = useSpring(useTransform(mouseY, [-100, 100], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-100, 100], [-10, 10]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      className="relative w-full max-w-sm sm:max-w-md mx-auto h-[235px] sm:h-[265px] my-2 flex items-center justify-center select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200 }}
    >
      {/* Floating Coffee Bean 1 (Top Left) */}
      <motion.div
        className="absolute top-2 left-8 sm:left-14 z-20 pointer-events-none"
        animate={{
          y: [-6, 6, -6],
          x: [-3, 4, -3],
          rotate: [-15, 10, -15],
        }}
        transition={{
          repeat: Infinity,
          duration: 5.2,
          ease: "easeInOut",
        }}
      >
        <CoffeeBean className="w-7 h-7 sm:w-8 sm:h-8 drop-shadow-lg" color="#3E2211" />
      </motion.div>

      {/* Floating Coffee Bean 2 (Top Right) */}
      <motion.div
        className="absolute top-4 right-8 sm:right-14 z-20 pointer-events-none"
        animate={{
          y: [6, -8, 6],
          x: [3, -3, 3],
          rotate: [18, -12, 18],
        }}
        transition={{
          repeat: Infinity,
          duration: 4.6,
          ease: "easeInOut",
          delay: 0.4,
        }}
      >
        <CoffeeBean className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow-md" color="#523118" />
      </motion.div>

      {/* Floating Coffee Bean 3 (Mid-Left, background) */}
      <motion.div
        className="absolute bottom-16 left-6 sm:left-10 z-0 pointer-events-none opacity-60 blur-[1px]"
        animate={{
          y: [-4, 6, -4],
          rotate: [-30, -10, -30],
        }}
        transition={{
          repeat: Infinity,
          duration: 6.5,
          ease: "easeInOut",
          delay: 0.8,
        }}
      >
        <CoffeeBean className="w-5 h-5" color="#331A0C" />
      </motion.div>

      {/* Floating Coffee Bean 4 (Bottom Right) */}
      <motion.div
        className="absolute bottom-8 right-8 sm:right-12 z-20 pointer-events-none"
        animate={{
          y: [5, -6, 5],
          rotate: [15, 35, 15],
        }}
        transition={{
          repeat: Infinity,
          duration: 4.8,
          ease: "easeInOut",
          delay: 1.2,
        }}
      >
        <CoffeeBean className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow-lg" color="#482713" />
      </motion.div>

      {/* Floating Coffee Bean 5 (Top Center tiny) */}
      <motion.div
        className="absolute top-0 right-24 sm:right-28 z-10 pointer-events-none opacity-75"
        animate={{
          y: [-3, 4, -3],
          rotate: [0, 80, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 7,
          ease: "easeInOut",
          delay: 1.5,
        }}
      >
        <CoffeeBean className="w-4 h-4 drop-shadow-sm" color="#412410" />
      </motion.div>

      {/* 3D Floating Coffee Pack */}
      <motion.div
        className="relative z-10 w-[130px] sm:w-[155px] cursor-grab active:cursor-grabbing flex flex-col items-center"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          y: [-6, 6, -6],
          rotateZ: [-1, 1, -1],
        }}
        transition={{
          repeat: Infinity,
          duration: 5.5,
          ease: "easeInOut",
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Standalone Transparent Coffee Pouch Silhouette */}
        <div className="relative filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.7)]">
          <Image
            src="/images/coffee_pouch_transparent.png"
            alt="Milan Farm Stay Estate Coffee Powder"
            width={480}
            height={600}
            priority
            className="w-[125px] sm:w-[150px] h-auto object-contain pointer-events-none select-none"
          />
        </div>
      </motion.div>
    </div>
  );
}
