import React, { useState } from "react";
import { motion } from "framer-motion";
import { partnershipsData } from "../data/portfolioData";

export default function Partnerships() {
  // Using React state guarantees the pause works, bypassing any Tailwind CSS config limitations
  const [isPaused, setIsPaused] = useState(false);

  // Variants for the staggered enter/exit animation on scroll
  const containerVariants = {
    hidden: {
      opacity: 0,
      transition: { staggerChildren: 0.02, staggerDirection: -1 },
    },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.02 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.95, transition: { duration: 0.2 } },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 200, damping: 20 },
    },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      // 'once: false' ensures the animation reverses (exits) when scrolling out of view, and re-enters when scrolling back
      viewport={{ once: false, amount: 0.1 }}
      variants={containerVariants}
      className="py-6 bg-yellow-500 overflow-hidden flex items-center border-y-2 border-neutral-200 dark:border-neutral-900 transition-colors duration-500"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="flex w-fit animate-marquee cursor-default"
        // Inline style natively overrides the CSS animation keyframe state perfectly
        style={{ animationPlayState: isPaused ? "paused" : "running" }}
      >
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="flex shrink-0 items-center gap-10 md:gap-16 px-6 md:px-8"
          >
            {partnershipsData.map((partner, index) => (
              <motion.div
                variants={itemVariants}
                key={`${i}-${index}`}
                className="flex items-center gap-10 md:gap-16"
              >
                <a
                  href={partner.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center h-10 md:h-14 min-w-[120px] transition-transform hover:scale-105 cursor-pointer z-10"
                  title={partner.name}
                >
                  <img
                    src={partner.logoUrl}
                    alt={partner.name}
                    className="max-h-full max-w-full object-contain filter grayscale opacity-70 mix-blend-multiply hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "block";
                    }}
                  />
                  {/* Fallback text if the logo image fails to load */}
                  <span className="hidden text-sm md:text-base font-black text-black/80 uppercase tracking-[0.15em] whitespace-nowrap hover:text-black transition-colors">
                    {partner.name}
                  </span>
                </a>

                {/* Divider Star */}
                <span className="text-black/30 text-lg">✦</span>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </motion.section>
  );
}
