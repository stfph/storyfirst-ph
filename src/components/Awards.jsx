import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { client, urlFor } from "../sanityClient";

export default function Awards() {
  const [data, setData] = useState({ settings: null, awards: [] });

  useEffect(() => {
    client
      .fetch(
        `{
      "settings": *[_type == "awardsSettings"][0],
      "awards": *[_type == "award"]
    }`,
      )
      .then(setData)
      .catch(console.error);
  }, []);

  const { settings, awards } = data;

  const containerVariants = {
    hidden: {
      opacity: 0,
      rotate: 2,
      scale: 0.96,
      transition: { duration: 0.4 },
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
    hidden: { opacity: 0, scale: 0.9, rotate: -3, y: 30, filter: "blur(4px)" },
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
      id="awards"
      className="py-24 bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-900 transition-colors duration-500 px-6 overflow-hidden"
    >
      <style
        dangerouslySetInnerHTML={{
          __html: ` .hide-scrollbar::-webkit-scrollbar { display: none; } .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; } `,
        }}
      />
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: 1 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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
          variants={containerVariants}
          className="flex md:flex-wrap md:justify-center overflow-x-auto md:overflow-x-visible snap-x md:snap-none hide-scrollbar gap-6 pb-8 md:pb-0"
        >
          {awards.map((award) => (
            <motion.div
              variants={itemVariants}
              key={award._id}
              className="group flex flex-col bg-neutral-50 dark:bg-[#0a0a0a] border border-neutral-200 dark:border-neutral-800 p-8 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-neutral-200/50 dark:hover:shadow-yellow-500/5 shrink-0 w-[80vw] sm:w-[50vw] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] snap-center md:snap-align-none"
            >
              <a
                href={award.verificationLink}
                target={award.verificationLink ? "_blank" : "_self"}
                rel="noreferrer"
                className="block relative h-32 mb-8 bg-white/80 dark:bg-neutral-900/80 p-4 border border-neutral-100 dark:border-neutral-800 rounded-lg overflow-hidden cursor-pointer"
              >
                {award.logo && (
                  <img
                    src={urlFor(award.logo).url()}
                    alt={`${award.title} logo`}
                    className="w-full h-full object-contain filter brightness-0 opacity-60 dark:invert dark:opacity-70 group-hover:!brightness-100 group-hover:!invert-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                )}
                <div
                  className={`${award.logo ? "hidden" : "flex"} absolute inset-0 items-center justify-center text-neutral-300 dark:text-neutral-700`}
                >
                  <Award size={48} strokeWidth={1} />
                </div>
                <div className="absolute inset-0 bg-yellow-500/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-black font-spartan font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
                    Verify Link <ExternalLink size={12} />
                  </span>
                </div>
              </a>

              <div className="flex-grow flex flex-col">
                <span className="text-yellow-600 dark:text-yellow-500 text-[10px] font-spartan font-bold tracking-[0.2em] uppercase mb-3 block">
                  {award.recognition}
                </span>
                <h3 className="text-xl font-anton font-normal text-neutral-900 dark:text-white uppercase leading-[1.1] tracking-wide mb-4">
                  {award.title}
                </h3>
                <div className="mt-auto pt-6 border-t border-neutral-200 dark:border-neutral-800">
                  <p className="text-xs font-spartan font-bold text-neutral-900 dark:text-white uppercase tracking-widest mb-1">
                    {award.project}
                  </p>
                  <p className="text-sm font-montserrat font-light text-neutral-500 dark:text-neutral-400 mt-2">
                    Role: {award.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
