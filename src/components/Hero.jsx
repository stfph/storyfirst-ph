import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { client } from "../sanityClient";

export default function Hero() {
  const [data, setData] = useState(null);

  useEffect(() => {
    client
      .fetch(`*[_type == "heroSettings"][0]`)
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data)
    return <section id="hero" className="h-screen bg-neutral-950"></section>;

  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden bg-neutral-950"
    >
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-80 contrast-125 saturate-110"
        >
          <source
            src={data.heroVideo || "./videos/storyfirst-clip.mp4"}
            type="video/mp4"
          />
        </video>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 text-center px-6 max-w-5xl mx-auto flex flex-col items-center mt-16"
      >
        <span className="text-yellow-500 font-spartan font-bold tracking-[0.3em] text-[10px] md:text-xs uppercase mb-6 drop-shadow-md">
          {data.topBadge}
        </span>

        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-anton font-normal text-white uppercase tracking-wide leading-[1.1] drop-shadow-2xl whitespace-pre-line">
          {data.headline}
          {data.highlightWord && (
            <>
              <br />
              <span className="bg-yellow-500 text-black px-6 py-2 inline-block mt-4 shadow-xl">
                {data.highlightWord}
              </span>
            </>
          )}
        </h1>

        <p className="mt-8 text-sm sm:text-base md:text-lg text-neutral-300 font-montserrat font-light max-w-3xl leading-relaxed drop-shadow-md">
          {data.subtext}
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-6">
          <a
            href="#work"
            className="bg-yellow-500 text-black px-10 py-4 font-spartan font-bold uppercase tracking-widest text-sm hover:bg-yellow-400 transition-colors shadow-xl shadow-yellow-500/20"
          >
            {data.primaryButtonText}
          </a>
          <a
            href="#contact"
            className="bg-transparent border-2 border-white/30 text-white px-10 py-4 font-spartan font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-colors backdrop-blur-sm"
          >
            {data.secondaryButtonText}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
