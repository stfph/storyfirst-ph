import React, { useState } from "react";
import { motion } from "framer-motion";
import { servicesData } from "../data/portfolioData";

export default function Services() {
  const [hoveredService, setHoveredService] = useState(null);

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: { staggerChildren: 0.08, staggerDirection: -1 },
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
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

  return (
    <section
      id="services"
      // Added subtle light mode background tint to help the background template stand out
      className="relative py-32 bg-neutral-100 dark:bg-neutral-900 overflow-hidden min-h-[80vh] flex items-center transition-colors duration-500"
    >
      {/* Background Media Reveal with enhanced light/dark mode opacities and gradient fading */}
      <div className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-1000 ease-in-out">
        {/* Default background template image when not hovering */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${hoveredService === null ? "opacity-100" : "opacity-0"}`}
        >
          <img
            src={servicesData[4]?.mediaUrl || "./images/services/default.jpg"}
            alt="default services background"
            // Increased opacity for light mode (0.15) and dark mode (0.25) so it's clearly noticeable
            className="w-full h-full object-cover opacity-15 dark:opacity-25 contrast-125 saturate-100 scale-105"
          />
          {/* Adjusted gradient overlay for light mode to prevent washout */}
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-100 via-neutral-100/75 to-neutral-100 dark:from-neutral-900 dark:via-neutral-900/80 dark:to-neutral-900 opacity-95"></div>
        </div>

        {/* Hovered service specific background images */}
        {servicesData.map((service) => (
          <div
            key={`media-${service.id}`}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${hoveredService === service.id ? "opacity-100" : "opacity-0"}`}
          >
            <img
              src={service.mediaUrl}
              alt="service background"
              className="w-full h-full object-cover opacity-25 dark:opacity-35 contrast-125 saturate-110 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-100 via-neutral-100/50 to-neutral-100 dark:from-neutral-900 dark:via-transparent dark:to-neutral-900 opacity-90"></div>
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="bg-yellow-500 text-black uppercase font-black px-3 py-1 text-[10px] tracking-[0.2em] inline-block mb-4 shadow-sm">
            What We Do
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-950 dark:text-white uppercase tracking-tight drop-shadow-xl">
            Our Expertise
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          exit="hidden"
          viewport={{ once: false, amount: 0.1 }}
          variants={containerVariants}
          className="flex flex-col border-t border-neutral-300 dark:border-neutral-800"
        >
          {servicesData.map((service) => (
            <motion.div
              variants={itemVariants}
              key={service.id}
              className="border-b border-neutral-300 dark:border-neutral-800 py-2"
            >
              <div
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
                className={`group flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-16 py-10 px-8 transition-all duration-500 ease-in-out rounded-3xl ${
                  hoveredService === service.id
                    ? "bg-gradient-to-r from-yellow-400 to-yellow-600 scale-[1.01] shadow-2xl"
                    : "hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-600 hover:scale-[1.01] hover:shadow-2xl"
                }`}
              >
                <div className="md:w-[50%]">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 dark:text-neutral-100 group-hover:text-black transition-colors duration-500 uppercase drop-shadow-md group-hover:drop-shadow-none">
                    {service.title}
                  </h3>
                </div>

                <div className="md:w-[50%] flex flex-col items-start md:items-end text-left md:text-right">
                  <p className="text-neutral-700 dark:text-neutral-300 group-hover:text-black/90 text-sm leading-relaxed font-bold transition-colors duration-500 drop-shadow-md group-hover:drop-shadow-none mb-6">
                    {service.description}
                  </p>
                  <a
                    href="#work"
                    className="inline-block bg-neutral-950 dark:bg-white text-white dark:text-black group-hover:bg-black group-hover:text-white px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-colors shadow-lg cursor-pointer"
                  >
                    Learn More / View Projects
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
