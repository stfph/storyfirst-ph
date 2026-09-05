import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { client, urlFor } from "../sanityClient";

export default function About() {
  const [data, setData] = useState(null);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    client
      .fetch(`*[_type == "aboutSettings"][0]`)
      .then(setData)
      .catch(console.error);
  }, []);

  // Slideshow timer logic
  useEffect(() => {
    if (!data?.collageImages?.length) return;
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % data.collageImages.length);
    }, 4000); // Crossfades every 4 seconds
    return () => clearInterval(interval);
  }, [data]);

  if (!data) return null;

  return (
    <section
      id="about"
      className="relative py-32 md:py-48 bg-white dark:bg-neutral-950 transition-colors duration-500 px-6 overflow-hidden flex items-center min-h-[80vh]"
    >
      {/* Background Slideshow */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        {data.collageImages?.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentBgIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={urlFor(img).url()}
              alt="Background collage"
              className="w-full h-full object-cover grayscale opacity-50 dark:opacity-40 contrast-125 scale-105"
            />
          </div>
        ))}
        {/* Dynamic theme overlay to protect text readability */}
        <div className="absolute inset-0 bg-white/85 dark:bg-neutral-950/85 transition-colors duration-500"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
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
            className="lg:col-span-7 flex flex-col justify-center space-y-8 text-neutral-800 dark:text-neutral-300 text-lg leading-relaxed font-montserrat font-light"
          >
            <p className="text-2xl text-neutral-950 dark:text-white font-montserrat font-medium leading-snug">
              {data.leadParagraph}
            </p>
            {data.bodyParagraphs?.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
