import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { client, urlFor } from "../sanityClient";

export default function Advocacies() {
  const [data, setData] = useState({ settings: null, advocacies: [] });

  useEffect(() => {
    client
      .fetch(
        `{
      "settings": *[_type == "advocaciesSettings"][0],
      "advocacies": *[_type == "advocacy"] | order(order asc)
    }`,
      )
      .then(setData)
      .catch(console.error);
  }, []);

  const { settings, advocacies } = data;

  const containerVariants = {
    hidden: {
      opacity: 0,
      rotate: -2,
      scale: 0.96,
      transition: { duration: 0.4 },
    },
    show: {
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: {
        staggerChildren: 0.1,
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
      id="advocacies"
      className="py-24 bg-white dark:bg-neutral-950 transition-colors duration-500 px-6 border-t border-neutral-200 dark:border-neutral-900 overflow-hidden"
    >
      <style
        dangerouslySetInnerHTML={{
          __html: ` .hide-scrollbar::-webkit-scrollbar { display: none; } .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; } `,
        }}
      />
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: -1 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8"
        >
          <div>
            <span className="bg-yellow-500 text-black uppercase font-spartan font-bold px-3 py-1 text-[10px] tracking-[0.2em] inline-block mb-4 shadow-sm">
              {settings.badge}
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-anton font-normal text-neutral-950 dark:text-white uppercase tracking-wide leading-[1.1]">
              {settings.headline}
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
          className="flex md:flex-wrap md:justify-center overflow-x-auto md:overflow-x-visible snap-x md:snap-none hide-scrollbar gap-6 md:gap-8 pb-8 md:pb-0"
        >
          {advocacies.map((advocacy) => (
            <motion.div
              variants={itemVariants}
              key={advocacy._id}
              className="group relative overflow-hidden bg-neutral-100 dark:bg-[#0a0a0a] min-h-[400px] flex flex-col justify-end p-8 border border-neutral-200 dark:border-neutral-800 cursor-default shrink-0 w-[85vw] sm:w-[60vw] md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] snap-center md:snap-align-none"
            >
              <div className="absolute inset-0 z-0">
                {advocacy.image && (
                  <img
                    src={urlFor(advocacy.image).url()}
                    alt={advocacy.title}
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-900 -z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
              </div>

              <div className="relative z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-2xl font-anton font-normal text-white uppercase tracking-wide mb-4 group-hover:text-yellow-500 transition-colors">
                  {advocacy.title}
                </h3>
                <div className="w-12 h-1 bg-yellow-500 mb-5 transition-all duration-500 group-hover:w-full"></div>
                <p className="text-neutral-300 text-sm leading-relaxed font-montserrat font-medium">
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
