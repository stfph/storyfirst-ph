import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { client, urlFor } from "../sanityClient";

export default function About() {
  const [data, setData] = useState(null);

  useEffect(() => {
    client
      .fetch(`*[_type == "aboutSettings"][0]`)
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) return null;

  return (
    <section
      id="about"
      className="py-32 bg-white dark:bg-neutral-950 transition-colors duration-500 px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Section: Text & Headlines */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <span className="bg-yellow-500 text-black uppercase font-spartan font-bold px-3 py-1 text-[10px] tracking-widest inline-block w-fit mb-6 shadow-sm">
              {data.badge}
            </span>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-anton font-normal text-neutral-950 dark:text-white uppercase tracking-wide leading-[1.1]">
              {data.headline}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">
                {data.highlightText}
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 flex flex-col justify-center space-y-8 text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed font-montserrat font-light"
          >
            <p className="text-2xl text-neutral-900 dark:text-neutral-200 font-montserrat font-medium leading-snug">
              {data.leadParagraph}
            </p>
            {data.bodyParagraphs?.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </motion.div>
        </div>

        {/* Bottom Section: 14-Image Portrait Collage */}
        {data.collageImages && data.collageImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-24 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4"
          >
            {data.collageImages.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="relative aspect-[3/4] overflow-hidden rounded-sm group cursor-pointer"
              >
                <img
                  src={urlFor(img).width(300).height(400).url()}
                  alt={`Case Study ${index + 1}`}
                  className="w-full h-full object-cover filter grayscale md:opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-out"
                />
                {/* Subtle dark overlay for depth */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
