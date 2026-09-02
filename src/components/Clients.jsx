import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { client, urlFor } from "../sanityClient";

export default function Clients() {
  const [data, setData] = useState({
    settings: null,
    clients: [],
    collaborators: [],
    categories: [],
  });
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    client
      .fetch(
        `{
          "settings": *[_type == "clientsSettings"][0],
          "categories": *[_type == "clientCategory"] | order(order asc),
          "clients": *[_type == "client"] | order(order asc) {
             ...,
             "category": category->title
          },
          "collaborators": *[_type == "collaborator"] | order(order asc)
        }`,
      )
      .then((res) => {
        setData(res);
        if (res.categories && res.categories.length > 0) {
          setActiveTab(res.categories[0].title);
        }
      })
      .catch(console.error);
  }, []);

  const { settings, clients, collaborators, categories } = data;
  const activeClients = clients.filter((c) => c.category === activeTab);

  const containerVariants = {
    hidden: {
      opacity: 0,
      rotate: 1,
      scale: 0.98,
      transition: { duration: 0.4 },
    },
    show: {
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 15 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 150, damping: 20 },
    },
  };

  if (!settings) return null;

  return (
    <section
      id="clients"
      className="py-24 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 transition-colors duration-500 px-6 overflow-hidden"
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
          className="mb-12"
        >
          <span className="bg-yellow-500 text-black uppercase font-spartan font-bold px-3 py-1 text-[10px] tracking-[0.2em] inline-block mb-4 shadow-sm">
            {settings.clientsBadge}
          </span>
          <h2 className="text-4xl sm:text-5xl font-anton font-normal text-neutral-950 dark:text-white uppercase tracking-wide leading-[1.1]">
            {settings.clientsHeadline}
          </h2>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400 font-montserrat font-light max-w-2xl leading-relaxed">
            {settings.clientsDescription}
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          exit="hidden"
          viewport={{ once: false, amount: 0.1 }}
          variants={containerVariants}
          className="flex overflow-x-auto hide-scrollbar snap-x gap-2 mb-10 border-b border-neutral-200 dark:border-neutral-800 pb-4"
        >
          {categories.map((tab) => (
            <motion.button
              variants={itemVariants}
              key={tab._id}
              onClick={() => setActiveTab(tab.title)}
              className="relative px-5 py-3 text-[10px] font-spartan font-bold uppercase tracking-[0.2em] transition-colors focus:outline-none whitespace-nowrap snap-start shrink-0"
            >
              <span
                className={`relative z-10 transition-colors duration-300 ${activeTab === tab.title ? "text-black dark:text-black" : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"}`}
              >
                {tab.title}
              </span>
              {activeTab === tab.title && (
                <motion.div
                  layoutId="activeClientTab"
                  className="absolute inset-0 bg-yellow-500 shadow-lg shadow-yellow-500/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        <div className="min-h-[200px] md:min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial="hidden"
              whileInView="show"
              exit="hidden"
              viewport={{ once: false, amount: 0.1 }}
              variants={containerVariants}
              className="flex md:flex-wrap md:justify-center overflow-x-auto md:overflow-x-visible snap-x md:snap-none hide-scrollbar gap-4 pb-6 md:pb-0"
            >
              {activeClients.map((clientData) => (
                <motion.a
                  variants={itemVariants}
                  key={clientData._id}
                  href={clientData.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative flex flex-col items-center justify-center p-8 bg-yellow-500/85 hover:bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.1)] hover:shadow-[0_0_35px_rgba(234,179,8,0.4)] border border-transparent hover:border-yellow-300 transition-all duration-300 cursor-pointer h-40 shrink-0 w-[65vw] sm:w-[45vw] md:w-[calc(20%-16px)] snap-center md:snap-align-none rounded-lg overflow-hidden"
                  title={clientData.name}
                >
                  {clientData.logo ? (
                    <img
                      src={urlFor(clientData.logo).url()}
                      alt={clientData.name}
                      className="max-h-16 sm:max-h-20 max-w-[85%] object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <span className="text-xs font-spartan font-bold uppercase tracking-widest text-center text-black">
                      {clientData.name}
                    </span>
                  )}
                </motion.a>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-24 md:mt-32">
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: -1 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <span className="bg-yellow-500 text-black uppercase font-spartan font-bold px-3 py-1 text-[10px] tracking-[0.2em] inline-block mb-4 shadow-sm">
              {settings.collabBadge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-anton font-normal text-neutral-950 dark:text-white uppercase tracking-wide leading-[1.1]">
              {settings.collabHeadline}
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            exit="hidden"
            viewport={{ once: false, amount: 0.1 }}
            variants={containerVariants}
            className="flex md:flex-wrap md:justify-center overflow-x-auto md:overflow-x-visible snap-x md:snap-none hide-scrollbar gap-6 md:gap-8 pb-8 md:pb-0"
          >
            {collaborators.map((person) => (
              <motion.div
                variants={itemVariants}
                key={person._id}
                className="group relative overflow-hidden bg-neutral-200 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 aspect-square shadow-md hover:shadow-[0_0_30px_rgba(234,179,8,0.15)] hover:border-yellow-500/30 transition-all duration-500 cursor-default shrink-0 w-[80vw] sm:w-[50vw] md:w-[calc(33.333%-22px)] max-w-sm snap-center md:snap-align-none rounded-lg"
              >
                {person.image && (
                  <motion.img
                    initial={{ scale: 1.15 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    viewport={{ once: false }}
                    src={urlFor(person.image).url()}
                    alt={person.name}
                    className="w-full h-full object-cover filter grayscale-0 md:grayscale opacity-100 md:opacity-90 md:group-hover:grayscale-0 md:group-hover:opacity-100 transition-all duration-700 ease-in-out md:group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 -z-10"></div>
                <div className="absolute bottom-0 left-0 w-full p-6 pt-16 transform translate-y-0 md:translate-y-6 md:group-hover:translate-y-0 transition-transform duration-500 ease-out bg-gradient-to-t from-black/95 to-transparent">
                  <h4 className="text-xl sm:text-2xl font-anton font-normal text-white uppercase tracking-wide transform opacity-100 md:opacity-90 md:group-hover:opacity-100 transition-opacity duration-300">
                    {person.name}
                  </h4>
                  <p className="text-yellow-400 text-[10px] sm:text-xs font-spartan font-bold uppercase tracking-widest mt-2 transform opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {person.context}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
