import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { client, urlFor } from "../sanityClient";

export default function Partnerships() {
  const [isPaused, setIsPaused] = useState(false);
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    client.fetch(`*[_type == "client"]`).then(setPartners).catch(console.error);
  }, []);

  if (partners.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      // Reverted back to once: false to restore the continuous scroll bi-animation
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.6 }}
      className="py-6 bg-yellow-500 overflow-hidden flex items-center border-y-2 border-neutral-200 dark:border-neutral-900 transition-colors duration-500"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="flex w-fit animate-marquee cursor-default group"
        style={{ animationPlayState: isPaused ? "paused" : "running" }}
      >
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="flex shrink-0 items-center gap-10 md:gap-16 px-6 md:px-8"
          >
            {partners.map((partner) => (
              <div
                key={`${i}-${partner._id}`}
                className="flex items-center gap-10 md:gap-16 opacity-100 transition-all duration-500 group-hover:opacity-30 hover:!opacity-100"
              >
                <a
                  href={partner.websiteUrl || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center h-10 md:h-14 min-w-[120px] transition-transform duration-500 hover:scale-110 cursor-pointer z-10"
                  title={partner.name}
                >
                  {partner.logo ? (
                    <img
                      src={urlFor(partner.logo).url()}
                      alt={partner.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <span className="text-sm md:text-base font-spartan font-bold text-black uppercase tracking-[0.15em] whitespace-nowrap">
                      {partner.name}
                    </span>
                  )}
                </a>
                <span className="text-black/30 text-lg">★</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </motion.section>
  );
}
