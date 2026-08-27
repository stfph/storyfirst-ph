import React from "react";
import { motion } from "framer-motion";
import { advocaciesData } from "../data/portfolioData";

export default function Advocacies() {
  // Framer Motion variants for bi-directional enter/exit scroll animation
  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: { staggerChildren: 0.08, staggerDirection: -1 },
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
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
    <section
      id="advocacies"
      className="py-24 bg-white dark:bg-neutral-950 transition-colors duration-500 px-6 border-t border-neutral-200 dark:border-neutral-900 overflow-hidden"
    >
      {/* Hide scrollbar for mobile swipeable gallery */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `,
        }}
      />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8"
        >
          <div>
            <span className="bg-yellow-500 text-black uppercase font-black px-3 py-1 text-[10px] tracking-[0.2em] inline-block mb-4 shadow-sm">
              Beyond Commercial Work
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-950 dark:text-white uppercase tracking-tight leading-[0.95]">
              Our Advocacies
            </h2>
          </div>
          <div className="max-w-md text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed">
            <p>
              StoryFirst PH is committed to empowering the next generation of
              communicators. We dedicate our time to initiatives focused on
              journalism education, media literacy, and advocacy storytelling.
            </p>
          </div>
        </motion.div>

        {/* Advocacies Gallery: Horizontal Swipe on Mobile, 3-Column Grid on Desktop with Bi-directional Animations */}
        <motion.div
          initial="hidden"
          whileInView="show"
          exit="hidden"
          viewport={{ once: false, amount: 0.1 }}
          variants={containerVariants}
          className="flex md:grid overflow-x-auto md:overflow-x-visible snap-x md:snap-none hide-scrollbar gap-6 md:gap-8 pb-8 md:pb-0 md:grid-cols-3"
        >
          {advocaciesData.map((advocacy) => (
            <motion.div
              variants={itemVariants}
              key={advocacy.id}
              className="group relative overflow-hidden bg-neutral-100 dark:bg-[#0a0a0a] min-h-[400px] flex flex-col justify-end p-8 border border-neutral-200 dark:border-neutral-800 cursor-default shrink-0 w-[85vw] sm:w-[60vw] md:w-auto snap-center md:snap-align-none"
            >
              {/* Background Image with Cinematic Hover */}
              <div className="absolute inset-0 z-0">
                <img
                  src={advocacy.imageUrl}
                  alt={advocacy.title}
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out group-hover:scale-105"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                {/* Fallback pattern if image is missing */}
                <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-900 -z-10"></div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
              </div>

              {/* Text Content */}
              <div className="relative z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-2xl font-black text-white uppercase tracking-wide mb-4 group-hover:text-yellow-500 transition-colors">
                  {advocacy.title}
                </h3>

                {/* Animated Divider */}
                <div className="w-12 h-1 bg-yellow-500 mb-5 transition-all duration-500 group-hover:w-full"></div>

                <p className="text-neutral-300 text-sm leading-relaxed font-medium">
                  {advocacy.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
