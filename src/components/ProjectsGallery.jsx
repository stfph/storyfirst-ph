import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData } from "../data/portfolioData";
import { ExternalLink } from "lucide-react";

export default function ProjectsGallery() {
  // Default filter to Documentaries
  const [filter, setFilter] = useState("Documentaries");

  // Categories matching the official brief
  const categories = ["Documentaries", "Content", "Events", "Workshops"];

  // Filtered projects list
  const filteredProjects = projectsData.filter((p) => p.category === filter);

  // Framer Motion variants for bi-directional enter/exit scroll animation
  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.08,
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
      id="work"
      className="py-24 bg-transparent transition-colors duration-500 max-w-7xl mx-auto px-6 border-t border-neutral-200 dark:border-neutral-900 overflow-hidden"
    >
      {/* Hide scrollbar for mobile swipeable layout */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8"
      >
        <div>
          <span className="bg-yellow-500 text-black uppercase font-black px-3 py-1 text-[10px] tracking-[0.2em] inline-block mb-3 shadow-sm">
            Selected Work
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-neutral-950 dark:text-white uppercase tracking-tight">
            Featured Projects
          </h2>
        </div>

        {/* Category Filter Tabs with Sliding Indicator */}
        <div className="flex overflow-x-auto hide-scrollbar snap-x gap-2 pb-2 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className="relative px-5 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-colors focus:outline-none whitespace-nowrap snap-start shrink-0 cursor-pointer"
            >
              <span
                className={`relative z-10 transition-colors duration-300 ${
                  filter === cat
                    ? "text-black dark:text-black"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                {cat}
              </span>
              {filter === cat && (
                <motion.div
                  layoutId="activeProjectTab"
                  className="absolute inset-0 bg-yellow-500 shadow-lg shadow-yellow-500/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Projects Gallery: Horizontal Swipe on Mobile, 3-Column Responsive Grid on Desktop */}
      <div className="min-h-[480px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial="hidden"
            whileInView="show"
            exit="hidden"
            viewport={{ once: false, amount: 0.1 }}
            variants={containerVariants}
            className="flex md:grid overflow-x-auto md:overflow-x-visible snap-x md:snap-none hide-scrollbar gap-6 pb-6 md:pb-0 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredProjects.map((project) => (
              <motion.a
                variants={itemVariants}
                href={project.linkUrl}
                target="_blank"
                rel="noreferrer"
                key={project.id}
                className="relative group min-h-[440px] sm:min-h-[480px] flex flex-col justify-end p-8 overflow-hidden bg-neutral-100 dark:bg-[#0a0a0a] border border-neutral-200 dark:border-neutral-800 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-neutral-300/50 dark:hover:shadow-yellow-500/5 block cursor-pointer shrink-0 w-[85vw] sm:w-[60vw] md:w-auto snap-center md:snap-align-none"
              >
                {/* Background Image with Cinematic Hover Zoom & Reveal */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-35 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/85 to-neutral-950/20 opacity-95 group-hover:opacity-90 transition-opacity duration-700"></div>
                </div>

                {/* Top Badge & Year Bar */}
                <div className="relative z-10 flex items-center justify-between gap-3 mb-auto">
                  <span className="inline-block bg-yellow-500 text-black text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1 shadow-sm">
                    {project.badge}
                  </span>
                  {project.year && (
                    <span className="text-[11px] font-mono font-bold text-neutral-400 dark:text-neutral-500 tracking-wider">
                      {project.year}
                    </span>
                  )}
                </div>

                {/* Content Details */}
                <div className="relative z-10 mt-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xl sm:text-2xl font-black text-white uppercase group-hover:text-yellow-500 transition-colors leading-tight drop-shadow-md">
                      {project.title}
                    </h3>
                    <ExternalLink
                      size={16}
                      className="text-neutral-400 group-hover:text-yellow-500 transition-colors shrink-0 mt-1"
                    />
                  </div>

                  {/* Role */}
                  <p className="text-yellow-400/90 text-xs font-bold uppercase tracking-wider mt-2">
                    {project.role}
                  </p>

                  {/* Short Editorial Description */}
                  {project.shortDescription && (
                    <p className="text-neutral-300 text-sm mt-3 leading-relaxed line-clamp-3 group-hover:text-white transition-colors">
                      {project.shortDescription}
                    </p>
                  )}

                  {/* Client Footer */}
                  {project.client && (
                    <p className="text-neutral-500 text-[10px] font-black tracking-[0.15em] uppercase border-t border-neutral-800/80 pt-4 mt-5 group-hover:text-neutral-400 transition-colors">
                      {project.client}
                    </p>
                  )}
                </div>
              </motion.a>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
