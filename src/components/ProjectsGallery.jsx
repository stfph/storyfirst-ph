import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, PlayCircle } from "lucide-react";
import { client, urlFor } from "../sanityClient";

export default function ProjectsGallery() {
  const [data, setData] = useState({
    settings: null,
    projects: [],
    categories: [],
  });
  const [filter, setFilter] = useState("");
  const [hoveredProject, setHoveredProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    client
      .fetch(
        `{
          "settings": *[_type == "projectsSettings"][0],
          "categories": *[_type == "projectCategory"] | order(order asc),
          "projects": *[_type == "project"] | order(order asc) {
            _id, title, "category": category->title, badge, client, clientLogo, role, year, shortDescription, image, linkUrl, videoEmbedUrl, awardsList
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

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedProject]);

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

  // GPU-optimized variants (Removed filter: blur to fix scroll glitches)
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, rotate: 3, y: 30 },
    show: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 18 },
    },
  };

  if (!settings) return null;

  return (
    <section
      id="work"
      className="relative py-24 bg-neutral-100 dark:bg-neutral-900 transition-colors duration-500 overflow-hidden border-t border-neutral-200 dark:border-neutral-900"
    >
      {/* Background Images Map */}
      <div className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-1000 ease-in-out z-0">
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${hoveredProject === null && !selectedProject ? "opacity-100" : "opacity-0"}`}
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
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${hoveredProject === project._id && !selectedProject ? "opacity-100" : "opacity-0"}`}
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
                <motion.div
                  variants={itemVariants}
                  key={project._id}
                  onClick={() => setSelectedProject(project)}
                  onMouseEnter={() => setHoveredProject(project._id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  className="relative group min-h-[440px] sm:min-h-[480px] flex flex-col justify-end p-8 overflow-hidden bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-neutral-300/50 dark:hover:shadow-yellow-500/5 block cursor-pointer shrink-0 w-[85vw] sm:w-[60vw] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-center md:snap-align-none"
                >
                  {/* Poster Background */}
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

                  {/* Play Overlay Indicator */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <PlayCircle
                      size={64}
                      strokeWidth={1}
                      className="text-yellow-500 drop-shadow-2xl"
                    />
                  </div>

                  {/* Genre / Medium Badge */}
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
                    {/* Title */}
                    <h3 className="text-2xl sm:text-3xl font-anton font-normal text-white uppercase tracking-wide group-hover:text-yellow-500 transition-colors leading-[1.1] drop-shadow-md">
                      {project.title}
                    </h3>

                    {/* Awards / Laurels */}
                    {project.awardsList && project.awardsList.length > 0 && (
                      <div className="flex flex-wrap gap-4 mt-6">
                        {project.awardsList.map((award, i) => (
                          <div
                            key={i}
                            className="flex flex-col items-center justify-center gap-1 text-center"
                          >
                            {award.laurelImage && (
                              <img
                                src={urlFor(award.laurelImage).url()}
                                alt={award.awardName || "Award Laurel"}
                                className="h-16 sm:h-20 w-auto object-contain drop-shadow-lg"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Roles */}
                    <p className="text-yellow-400/90 text-[11px] font-spartan font-bold uppercase tracking-widest mt-5">
                      ROLE/S: <span className="text-white">{project.role}</span>
                    </p>

                    {/* Client with Logo (Yellow Background Applied) */}
                    {(project.client || project.clientLogo) && (
                      <div className="border-t border-neutral-800/80 pt-4 mt-5 flex items-center gap-4">
                        {project.clientLogo && (
                          <img
                            src={urlFor(project.clientLogo).url()}
                            alt={project.client}
                            className="h-8 sm:h-10 w-auto max-w-[120px] object-contain drop-shadow-md bg-yellow-500/60 rounded px-2 py-1"
                          />
                        )}
                        {project.client && (
                          <span className="text-neutral-300 text-[10px] font-spartan font-bold tracking-[0.15em] uppercase transition-colors">
                            {project.client}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Pop-up Video Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-neutral-950 border border-neutral-800 shadow-2xl rounded-xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-yellow-500 hover:text-black text-white rounded-full transition-colors cursor-pointer"
              >
                <X size={20} strokeWidth={2.5} />
              </button>

              {/* Video or Image Container */}
              <div className="w-full aspect-video bg-black relative flex-shrink-0">
                {selectedProject.videoEmbedUrl ? (
                  <iframe
                    src={selectedProject.videoEmbedUrl}
                    title={selectedProject.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-0"
                  ></iframe>
                ) : selectedProject.image ? (
                  <img
                    src={urlFor(selectedProject.image).url()}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover opacity-80"
                  />
                ) : null}
              </div>

              {/* Details & External Link */}
              <div className="p-6 sm:p-10 overflow-y-auto flex flex-col md:flex-row gap-8 justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-3xl sm:text-4xl font-anton font-normal text-white uppercase tracking-wide leading-tight mb-4">
                    {selectedProject.title}
                  </h3>
                  <p className="text-yellow-500 text-xs font-spartan font-bold uppercase tracking-widest mb-4">
                    ROLE/S: {selectedProject.role}
                  </p>
                  <p className="text-neutral-300 font-montserrat font-light leading-relaxed">
                    {selectedProject.shortDescription}
                  </p>
                </div>

                <div className="w-full md:w-auto flex-shrink-0 flex flex-col gap-4 items-start md:items-end mt-4 md:mt-0">
                  {selectedProject.linkUrl && (
                    <a
                      href={selectedProject.linkUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-3 bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 font-spartan font-bold uppercase tracking-widest text-xs transition-colors shadow-lg cursor-pointer text-center w-full md:w-auto justify-center"
                    >
                      {settings.externalLinkText || "Visit External Link"}{" "}
                      <ExternalLink size={16} />
                    </a>
                  )}
                  {selectedProject.client && (
                    <p className="text-neutral-500 text-[10px] font-spartan font-bold tracking-[0.15em] uppercase text-center w-full md:text-right md:w-auto">
                      Client: {selectedProject.client}
                    </p>
                  )}

                  {/* Awards / Laurels inside Modal (below the link and client) */}
                  {selectedProject.awardsList &&
                    selectedProject.awardsList.length > 0 && (
                      <div className="flex flex-wrap gap-4 mt-2 justify-center md:justify-end w-full border-t border-neutral-800/80 pt-4">
                        {selectedProject.awardsList.map((award, i) => (
                          <div
                            key={i}
                            className="flex flex-col items-center justify-center text-center"
                          >
                            {award.laurelImage && (
                              <img
                                src={urlFor(award.laurelImage).url()}
                                alt={award.awardName || "Award Laurel"}
                                className="h-12 sm:h-14 w-auto object-contain drop-shadow-md"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
