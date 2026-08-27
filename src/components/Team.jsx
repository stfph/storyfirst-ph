import React from "react";
import { motion } from "framer-motion";
import { teamData } from "../data/portfolioData";

export default function Team() {
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
      id="team"
      className="py-24 bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-900 transition-colors duration-500 px-6 overflow-hidden"
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `,
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Corrected Alignment: Changed text-center md:text-left to text-center across all viewports to match the image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center flex flex-col items-center justify-center gap-6"
        >
          <div>
            <span className="bg-yellow-500 text-black uppercase font-black px-3 py-1 text-[10px] tracking-[0.2em] inline-block mb-4 shadow-sm">
              The People Behind The Stories
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-950 dark:text-white uppercase tracking-tight leading-[0.95]">
              Our Team
            </h2>
          </div>
          <div className="max-w-xl text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed text-center">
            <p>
              StoryFirst PH is more than one perspective. We are a collective of
              producers, researchers, and storytellers dedicated to producing
              narratives that resonate with different audiences and
              organizations.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          exit="hidden"
          viewport={{ once: false, amount: 0.1 }}
          variants={containerVariants}
          className="flex md:grid overflow-x-auto md:overflow-x-visible snap-x md:snap-none hide-scrollbar gap-6 md:gap-8 lg:gap-12 pb-8 md:pb-0 sm:grid-cols-2 lg:grid-cols-3"
        >
          {teamData.map((member) => (
            <motion.div
              variants={itemVariants}
              key={member.id}
              className="group flex flex-col shrink-0 w-[80vw] sm:w-[50vw] md:w-auto snap-center md:snap-align-none"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 dark:bg-[#0a0a0a] mb-6">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out group-hover:scale-105"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-900 -z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              <div>
                <h3 className="text-2xl font-black text-neutral-900 dark:text-white uppercase tracking-wide">
                  {member.name}
                </h3>
                <p className="text-yellow-600 dark:text-yellow-500 text-[10px] font-black tracking-[0.2em] mt-2">
                  {member.position}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
