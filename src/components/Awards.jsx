import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { client, urlFor } from "../sanityClient";

export default function Awards() {
  const [data, setData] = useState({ settings: null, awards: [] });
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    client
      .fetch(
        `{
      "settings": *[_type == "awardsSettings"][0],
      "awards": *[_type == "award" && isArchived != true] | order(order asc)
    }`,
      )
      .then(setData)
      .catch(console.error);
  }, []);

  const { settings, awards } = data;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % awards.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + awards.length) % awards.length);
  };

  if (!settings || awards.length === 0) return null;

  const currentAward = awards[currentIndex];

  const slideVariants = {
    hidden: { opacity: 0, rotate: 3, scale: 0.95, y: 15 },
    show: {
      opacity: 1,
      rotate: 0,
      scale: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
      opacity: 0,
      rotate: -3,
      scale: 0.95,
      y: -15,
      transition: { duration: 0.3, ease: [0.4, 0, 1, 1] },
    },
  };

  const scrollVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section
      id="awards"
      className="py-24 bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-900 transition-colors duration-500 px-6 overflow-hidden"
    >
      <div className="hidden" aria-hidden="true">
        {awards.map(
          (award) =>
            award.logo && (
              <img
                key={`preload-${award._id}`}
                src={urlFor(award.logo).url()}
                alt=""
              />
            ),
        )}
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="show"
          exit="hidden"
          viewport={{ once: false, amount: 0.1 }}
          variants={scrollVariants}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <span className="bg-yellow-500 text-black uppercase font-spartan font-bold px-3 py-1 text-[10px] tracking-[0.2em] inline-block mb-4 shadow-sm">
              {settings.badge}
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-anton font-normal text-neutral-950 dark:text-white uppercase tracking-wide leading-[1.1]">
              {settings.headline}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">
                {settings.highlightText}
              </span>
            </h2>
          </div>
          <div className="max-w-md text-neutral-600 dark:text-neutral-400 font-montserrat font-light leading-relaxed">
            <p>{settings.description}</p>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          exit="hidden"
          viewport={{ once: false, amount: 0.1 }}
          variants={scrollVariants}
          className="relative max-w-4xl mx-auto min-h-[450px] flex flex-col justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentAward._id || currentIndex}
              variants={slideVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="bg-neutral-50 dark:bg-[#0a0a0a] border border-neutral-200 dark:border-neutral-800 p-8 sm:p-14 shadow-[0_0_30px_rgba(234,179,8,0.05)] hover:shadow-[0_0_50px_rgba(234,179,8,0.2)] hover:border-yellow-500/30 transition-shadow duration-700 relative flex flex-col md:flex-row items-center gap-10 rounded-xl"
            >
              <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 bg-yellow-500/85 hover:bg-yellow-500 transition-colors duration-500 rounded-xl min-h-[240px] group">
                {currentAward.logo ? (
                  <img
                    src={urlFor(currentAward.logo).url()}
                    alt={`${currentAward.title} logo`}
                    className="max-h-36 max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="text-black transition-transform duration-500 group-hover:scale-105">
                    <Award size={72} strokeWidth={1} />
                  </div>
                )}
                {currentAward.verificationLink && (
                  <a
                    href={currentAward.verificationLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 text-xs font-spartan font-bold uppercase tracking-widest text-black/70 hover:text-black flex items-center gap-2 transition-colors"
                  >
                    {settings.verifyButtonText || "Verify Recognition"}{" "}
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>

              <div className="w-full md:w-1/2 flex flex-col text-left">
                <span className="text-yellow-600 dark:text-yellow-500 text-xs font-spartan font-bold tracking-[0.2em] uppercase mb-3 block">
                  {currentAward.recognition}
                </span>
                <h3 className="text-2xl sm:text-3xl font-anton font-normal text-neutral-900 dark:text-white uppercase leading-[1.1] tracking-wide mb-6">
                  {currentAward.title}
                </h3>
                <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
                  <p className="text-sm font-spartan font-bold text-neutral-900 dark:text-white uppercase tracking-widest">
                    {currentAward.project}
                  </p>
                  <p className="text-sm font-montserrat font-light text-neutral-500 dark:text-neutral-400">
                    Role: {currentAward.role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between items-center mt-8 px-4">
            <span className="text-xs font-spartan font-bold tracking-widest text-neutral-400">
              {currentIndex + 1} / {awards.length}
            </span>
            <div className="flex items-center gap-4">
              <button
                onClick={handlePrev}
                className="p-3 bg-neutral-100 dark:bg-neutral-900 hover:bg-yellow-500 hover:text-black dark:hover:bg-yellow-500 dark:hover:text-black text-neutral-900 dark:text-white rounded-full transition-colors cursor-pointer shadow-md"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNext}
                className="p-3 bg-neutral-100 dark:bg-neutral-900 hover:bg-yellow-500 hover:text-black dark:hover:bg-yellow-500 dark:hover:text-black text-neutral-900 dark:text-white rounded-full transition-colors cursor-pointer shadow-md"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
