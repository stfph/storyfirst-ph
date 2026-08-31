import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { client, urlFor } from "../sanityClient";

export default function Partnerships() {
  const [isPaused, setIsPaused] = useState(false);
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    // Fetching all clients to power the infinite marquee
    client.fetch(`*[_type == "client"]`).then(setPartners).catch(console.error);
  }, []);

  const containerVariants = {
    hidden: {
      opacity: 0,
      transition: { staggerChildren: 0.02, staggerDirection: -1 },
    },
    show: { opacity: 1, transition: { staggerChildren: 0.02 } },
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

  if (partners.length === 0) return null;

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.1 }}
      variants={containerVariants}
      className="py-6 bg-yellow-500 overflow-hidden flex items-center border-y-2 border-neutral-200 dark:border-neutral-900 transition-colors duration-500"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="flex w-fit animate-marquee cursor-default"
        style={{ animationPlayState: isPaused ? "paused" : "running" }}
      >
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="flex shrink-0 items-center gap-10 md:gap-16 px-6 md:px-8"
          >
            {partners.map((partner) => (
              <motion.div
                variants={itemVariants}
                key={`${i}-${partner._id}`}
                className="flex items-center gap-10 md:gap-16"
              >
                <a
                  href={partner.websiteUrl || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center h-10 md:h-14 min-w-[120px] transition-transform hover:scale-105 cursor-pointer z-10"
                  title={partner.name}
                >
                  {partner.logo && (
                    <img
                      src={urlFor(partner.logo).url()}
                      alt={partner.name}
                      className="max-h-full max-w-full object-contain filter grayscale opacity-70 mix-blend-multiply hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "block";
                      }}
                    />
                  )}
                  <span
                    className={`${partner.logo ? "hidden" : "block"} text-sm md:text-base font-spartan font-bold text-black/80 uppercase tracking-[0.15em] whitespace-nowrap hover:text-black transition-colors`}
                  >
                    {partner.name}
                  </span>
                </a>
                <span className="text-black/30 text-lg">★</span>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </motion.section>
  );
}
