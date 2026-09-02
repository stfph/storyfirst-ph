import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { client, urlFor } from "../sanityClient";

export default function ProjectsGallery() {
  const [data, setData] = useState({
    settings: null,
    projects: [],
    categories: [],
  });
  const [filter, setFilter] = useState("");
  const [hoveredProject, setHoveredProject] = useState(null);

  useEffect(() => {
    client
      .fetch(
        `{
          "settings": *[_type == "projectsSettings"][0],
          "categories": *[_type == "projectCategory"] | order(order asc),
          "projects": *[_type == "project"] | order(order asc) {
            _id, title, "category": category->title, badge, client, role, year, shortDescription, image, linkUrl
          }
        }`,
      )
      .then((res) => {
        setData(res);
        if (res.categories && res.categories.length > 0) {
          setFilter(res.categories[0].title);
        }
      })
      .catch(console.error);
  }, []);

  const { settings, projects, categories } = data;
  const filteredProjects = projects.filter((p) => p.category === filter);

  const containerVariants = {
    hidden: {
      opacity: 0,
      rotate: -2,
      scale: 0.96,
      transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] },
    },
    show: {
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, rotate: 3, y: 30, filter: "blur(4px)" },
    show: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 120, damping: 18 },
    },
  };

  if (!settings) return null;

  return (
    <section
      id="work"
      className="relative py-24 bg-neutral-100 dark:bg-neutral-900 transition-colors duration-500 overflow-hidden border-t border-neutral-200 dark:border-neutral-900"
    >
      <div className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-1000 ease-in-out z-0">
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${hoveredProject === null ? "opacity-100" : "opacity-0"}`}
        >
          {filteredProjects.length > 0 && filteredProjects[0].image && (
            <img
              src={urlFor(filteredProjects[0].image).url()}
              alt="default projects background"
              className="w-full h-full object-cover opacity-15 dark:opacity-25 grayscale contrast-125 saturate-100 scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-100 via-neutral-100/75 to-neutral-100 dark:from-neutral-900 dark:via-neutral-900/80 dark:to-neutral-900 opacity-95"></div>
        </div>
        {filteredProjects.map(
          (project) =>
            project.image && (
              <div
                key={`bg-${project._id}`}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${hoveredProject === project._id ? "opacity-100" : "opacity-0"}`}
              >
                <img
                  src={urlFor(project.image).url()}
                  alt="project background template"
                  className="w-full h-full object-cover opacity-25 dark:opacity-35 contrast-125 saturate-110 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-neutral-100 via-neutral-100/50 to-neutral-100 dark:from-neutral-900 dark:via-neutral-900/60 dark:to-neutral-900 opacity-90"></div>
              </div>
            ),
        )}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: ` .hide-scrollbar::-webkit-scrollbar { display: none; } .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; } `,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: -1 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8"
        >
          <div>
            <span className="bg-yellow-500 text-black uppercase font-spartan font-bold px-3 py-1 text-[10px] tracking-widest inline-block mb-3 shadow-sm">
              {settings.badge}
            </span>
            <h2 className="text-4xl sm:text-5xl font-anton font-normal text-neutral-950 dark:text-white uppercase tracking-wide leading-[1.1]">
              {settings.headline}
            </h2>
          </div>

          <div className="flex overflow-x-auto hide-scrollbar snap-x gap-2 pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => {
                  setFilter(cat.title);
                  setHoveredProject(null);
                }}
                className="relative px-5 py-3 text-[10px] font-spartan font-bold uppercase tracking-[0.2em] transition-colors focus:outline-none whitespace-nowrap snap-start shrink-0 cursor-pointer"
              >
                <span
                  className={`relative z-10 transition-colors duration-300 ${filter === cat.title ? "text-black dark:text-black" : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"}`}
                >
                  {cat.title}
                </span>
                {filter === cat.title && (
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

        <div className="min-h-[480px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial="hidden"
              whileInView="show"
              exit="hidden"
              viewport={{ once: false, amount: 0.1 }}
              variants={containerVariants}
              className="flex md:flex-wrap md:justify-center overflow-x-auto md:overflow-x-visible snap-x md:snap-none hide-scrollbar gap-6 pb-6 md:pb-0"
            >
              {filteredProjects.map((project) => (
                <motion.a
                  variants={itemVariants}
                  href={project.linkUrl}
                  target="_blank"
                  rel="noreferrer"
                  key={project._id}
                  onMouseEnter={() => setHoveredProject(project._id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  className="relative group min-h-[440px] sm:min-h-[480px] flex flex-col justify-end p-8 overflow-hidden bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-neutral-300/50 dark:hover:shadow-yellow-500/5 block cursor-pointer shrink-0 w-[85vw] sm:w-[60vw] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-center md:snap-align-none"
                >
                  <div className="absolute inset-0 z-0">
                    {project.image && (
                      <img
                        src={urlFor(project.image).url()}
                        alt={project.title}
                        className="w-full h-full object-cover opacity-35 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/85 to-neutral-950/20 opacity-95 group-hover:opacity-90 transition-opacity duration-700"></div>
                  </div>
                  <div className="relative z-10 flex items-center justify-between gap-3 mb-auto">
                    <span className="inline-block bg-yellow-500 text-black text-[10px] font-spartan font-bold tracking-[0.2em] uppercase px-3 py-1 shadow-sm">
                      {project.badge}
                    </span>
                    {project.year && (
                      <span className="text-[11px] font-spartan font-bold text-neutral-400 dark:text-neutral-500 tracking-widest">
                        {project.year}
                      </span>
                    )}
                  </div>
                  <div className="relative z-10 mt-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-2xl sm:text-3xl font-anton font-normal text-white uppercase tracking-wide group-hover:text-yellow-500 transition-colors leading-[1.1] drop-shadow-md">
                        {project.title}
                      </h3>
                      <ExternalLink
                        size={16}
                        className="text-neutral-400 group-hover:text-yellow-500 transition-colors shrink-0 mt-2"
                      />
                    </div>
                    <p className="text-yellow-400/90 text-xs font-spartan font-bold uppercase tracking-widest mt-3">
                      {project.role}
                    </p>
                    {project.shortDescription && (
                      <p className="text-neutral-300 text-sm mt-3 leading-relaxed line-clamp-3 font-montserrat font-light group-hover:text-white transition-colors">
                        {project.shortDescription}
                      </p>
                    )}
                    {project.client && (
                      <p className="text-neutral-500 text-[10px] font-spartan font-bold tracking-[0.15em] uppercase border-t border-neutral-800/80 pt-4 mt-5 group-hover:text-neutral-400 transition-colors">
                        {project.client}
                      </p>
                    )}
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
