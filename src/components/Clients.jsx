import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clientsData, collaboratorsData } from "../data/portfolioData";

export default function Clients() {
  const [activeTab, setActiveTab] = useState("media");

  const tabs = [
    { id: "media", label: "Media & Production" },
    { id: "brands", label: "Brands & Corporations" },
    { id: "organizations", label: "Organizations & NGOs" },
    { id: "institutions", label: "Education & Institutions" },
  ];

  // Framer Motion variants for staggered grid loading
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 200, damping: 20 },
    },
  };

  return (
    <section
      id="clients"
      className="py-24 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 transition-colors duration-500 px-6 overflow-hidden"
    >
      {/* Hide scrollbar for mobile swipeable tabs and galleries */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `,
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* --- CLIENTS & PARTNERS SECTION --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="bg-yellow-500 text-black uppercase font-black px-3 py-1 text-[10px] tracking-[0.2em] inline-block mb-4 shadow-sm">
            Trusted By
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-neutral-950 dark:text-white uppercase tracking-tight leading-[0.95]">
            Clients & Collaborators
          </h2>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400 font-medium max-w-2xl leading-relaxed">
            We cover, pitch, and produce stories for various media
            organizations, and fix production needs for foreign media working in
            the Philippines.
          </p>
        </motion.div>

        {/* Interactive Horizontal Swipeable Tabs */}
        <div className="flex overflow-x-auto hide-scrollbar snap-x gap-2 mb-10 border-b border-neutral-200 dark:border-neutral-800 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative px-5 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-colors focus:outline-none whitespace-nowrap snap-start shrink-0"
            >
              <span
                className={`relative z-10 transition-colors duration-300 ${
                  activeTab === tab.id
                    ? "text-black dark:text-black"
                    : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                {tab.label}
              </span>
              {/* Active Tab Highlight Indicator */}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeClientTab"
                  className="absolute inset-0 bg-yellow-500 shadow-lg shadow-yellow-500/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Categorized Client Grid with Mobile Horizontal Scroll */}
        <div className="min-h-[200px] md:min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="flex md:grid overflow-x-auto md:overflow-x-visible snap-x md:snap-none hide-scrollbar gap-4 pb-6 md:pb-0 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            >
              {clientsData[activeTab].map((client, index) => (
                <motion.a
                  variants={itemVariants}
                  key={index}
                  href={client.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative flex flex-col items-center justify-center p-8 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 hover:bg-gradient-to-br hover:from-yellow-400 hover:to-yellow-500 active:bg-gradient-to-br active:from-yellow-400 active:to-yellow-500 hover:border-yellow-400 transition-all duration-300 cursor-pointer h-40 shrink-0 w-[65vw] sm:w-[45vw] md:w-auto snap-center md:snap-align-none shadow-sm hover:shadow-xl hover:-translate-y-1 overflow-hidden"
                  title={client.name}
                >
                  <img
                    src={client.logoUrl}
                    alt={client.name}
                    className="max-h-16 sm:max-h-20 max-w-[85%] object-contain filter brightness-0 opacity-40 dark:invert dark:opacity-60 group-hover:!brightness-100 group-hover:!invert-0 group-hover:opacity-100 group-active:!brightness-100 group-active:!invert-0 group-active:opacity-100 group-hover:drop-shadow-md transition-all duration-500"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "block";
                    }}
                  />
                  <span className="hidden text-xs font-black uppercase tracking-wider text-center text-neutral-800 dark:text-neutral-200 group-hover:text-black group-active:text-black transition-colors">
                    {client.name}
                  </span>
                </motion.a>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- PEOPLE WE'VE WORKED WITH SECTION --- */}
        <div className="mt-24 md:mt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span className="bg-yellow-500 text-black uppercase font-black px-3 py-1 text-[10px] tracking-[0.2em] inline-block mb-4 shadow-sm">
              Notable Collaborators
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-neutral-950 dark:text-white uppercase tracking-tight leading-none">
              People We've Worked With
            </h2>
          </motion.div>

          <div className="flex md:grid overflow-x-auto md:overflow-x-visible snap-x md:snap-none hide-scrollbar gap-6 md:gap-8 pb-8 md:pb-0 md:grid-cols-2 lg:grid-cols-3">
            {collaboratorsData.map((person, index) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                key={person.id}
                className="group relative overflow-hidden bg-neutral-200 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 aspect-square shadow-md hover:shadow-2xl transition-shadow duration-500 cursor-default shrink-0 w-[80vw] sm:w-[50vw] md:w-auto snap-center md:snap-align-none"
              >
                <motion.img
                  initial={{ scale: 1.15 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  viewport={{ once: true }}
                  src={person.imageUrl}
                  alt={person.name}
                  className="w-full h-full object-cover filter grayscale-0 md:grayscale opacity-100 md:opacity-90 md:group-hover:grayscale-0 md:group-hover:opacity-100 transition-all duration-700 ease-in-out md:group-hover:scale-105"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />

                <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 -z-10"></div>

                {/* Removed the blurry backdrop-blur-md and replaced with a clean, sharp linear gradient fade to keep text legible */}
                <div className="absolute bottom-0 left-0 w-full p-6 pt-16 transform translate-y-0 md:translate-y-6 md:group-hover:translate-y-0 transition-transform duration-500 ease-out bg-gradient-to-t from-black/95 to-transparent">
                  <h4 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wide transform opacity-100 md:opacity-90 md:group-hover:opacity-100 transition-opacity duration-300">
                    {person.name}
                  </h4>
                  <p className="text-yellow-400 text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] mt-2 transform opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {person.context}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
