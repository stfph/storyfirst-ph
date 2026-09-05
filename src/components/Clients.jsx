import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  X,
  PlayCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { client, urlFor } from "../sanityClient";

export default function Clients() {
  const [data, setData] = useState({
    settings: null,
    clients: [],
    collaborators: [],
    categories: [],
  });
  const [activeTab, setActiveTab] = useState("");
  const [selectedCollab, setSelectedCollab] = useState(null);
  const [collabWorkIndex, setCollabWorkIndex] = useState(0);

  useEffect(() => {
    client
      .fetch(
        `{
          "settings": *[_type == "clientsSettings"][0],
          "categories": *[_type == "clientCategory"] | order(order asc),
          "clients": *[_type == "client" && isArchived != true] | order(order asc) {
             ...,
             "category": category->title
          },
          "collaborators": *[_type == "collaborator" && isArchived != true] | order(order asc) {
             ...,
             collaborations[]{ profile, videoEmbedUrl, image, linkUrl }
          }
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

  useEffect(() => {
    if (selectedCollab) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedCollab]);

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

  const hasCollaborations =
    selectedCollab?.collaborations && selectedCollab.collaborations.length > 0;
  const currentWork = hasCollaborations
    ? selectedCollab.collaborations[collabWorkIndex]
    : {
        profile: selectedCollab?.profile,
        videoEmbedUrl: selectedCollab?.videoEmbedUrl,
        image: selectedCollab?.image,
        linkUrl: selectedCollab?.linkUrl,
      };
  const totalWorks = hasCollaborations
    ? selectedCollab.collaborations.length
    : 1;

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
              {settings.collabHeadline || "Notable Collabs"}
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
                onClick={() => {
                  setSelectedCollab(person);
                  setCollabWorkIndex(0);
                }}
                className="group relative overflow-hidden bg-neutral-200 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 aspect-square shadow-md hover:shadow-[0_0_30px_rgba(234,179,8,0.15)] hover:border-yellow-500/30 transition-all duration-500 cursor-pointer shrink-0 w-[65vw] sm:w-[45vw] md:w-[calc(33.333%-22px)] lg:w-[calc(20%-26px)] snap-center md:snap-align-none rounded-lg"
              >
                {person.image && (
                  <motion.img
                    initial={{ scale: 1.15 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    viewport={{ once: false }}
                    src={urlFor(person.image).url()}
                    alt={person.name}
                    className="w-full h-full object-cover transition-all duration-700 ease-in-out md:group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 -z-10"></div>
                <div className="absolute bottom-0 left-0 w-full p-4 sm:p-5 pt-12 transform translate-y-0 md:translate-y-6 md:group-hover:translate-y-0 transition-transform duration-500 ease-out bg-gradient-to-t from-black/95 to-transparent">
                  <h4 className="text-lg sm:text-xl font-anton font-normal text-white uppercase tracking-wide transform opacity-100 md:opacity-90 md:group-hover:opacity-100 transition-opacity duration-300">
                    {person.name}
                  </h4>
                  <p className="text-yellow-400 flex items-center gap-1 text-[9px] sm:text-[10px] font-spartan font-bold uppercase tracking-widest mt-1 transform opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {settings.collabHoverText || "See our work together →"}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {selectedCollab && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCollab(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-neutral-950 border border-neutral-800 shadow-2xl rounded-xl overflow-hidden flex flex-col max-h-[95vh]"
            >
              <button
                onClick={() => setSelectedCollab(null)}
                className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-yellow-500 hover:text-black text-white rounded-full transition-colors cursor-pointer"
              >
                <X size={20} strokeWidth={2.5} />
              </button>
              <AnimatePresence mode="wait">
                <motion.div
                  key={collabWorkIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full aspect-video bg-black relative flex-shrink-0"
                >
                  {currentWork.videoEmbedUrl ? (
                    <iframe
                      src={currentWork.videoEmbedUrl}
                      title={`${selectedCollab.name} - Project ${collabWorkIndex + 1}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full border-0"
                    ></iframe>
                  ) : currentWork.image ? (
                    <img
                      src={urlFor(currentWork.image).url()}
                      alt={selectedCollab.name}
                      className="w-full h-full object-cover opacity-80"
                    />
                  ) : selectedCollab.image ? (
                    <img
                      src={urlFor(selectedCollab.image).url()}
                      alt={selectedCollab.name}
                      className="w-full h-full object-cover opacity-80"
                    />
                  ) : null}
                </motion.div>
              </AnimatePresence>

              <div className="p-4 sm:p-6 overflow-y-auto flex flex-col md:flex-row gap-4 sm:gap-6 justify-between items-start flex-1 min-h-[120px]">
                <div className="flex-1 flex flex-col h-full">
                  <h3 className="text-2xl sm:text-3xl font-anton font-normal text-white uppercase tracking-wide leading-tight mb-1 sm:mb-2">
                    {selectedCollab.name}
                  </h3>
                  {selectedCollab.country && (
                    <p className="text-yellow-500 text-[10px] sm:text-xs font-spartan font-bold uppercase tracking-widest mb-2 sm:mb-3">
                      {selectedCollab.country}
                    </p>
                  )}
                  {currentWork.profile && (
                    <motion.p
                      key={collabWorkIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-neutral-300 text-sm sm:text-base font-montserrat font-light leading-relaxed"
                    >
                      {currentWork.profile}
                    </motion.p>
                  )}
                </div>
                <div className="w-full md:w-auto flex-shrink-0 flex flex-col gap-3 sm:gap-4 items-start md:items-end justify-between h-full mt-2 md:mt-0">
                  {currentWork.linkUrl && (
                    <a
                      href={currentWork.linkUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black px-5 py-2.5 sm:px-6 sm:py-3 font-spartan font-bold uppercase tracking-widest text-[10px] sm:text-xs transition-colors shadow-lg cursor-pointer text-center w-full md:w-auto justify-center"
                    >
                      Visit External Link <ExternalLink size={14} />
                    </a>
                  )}
                  {totalWorks > 1 && (
                    <div className="flex items-center justify-between w-full md:w-auto gap-4 mt-auto pt-3 sm:pt-4 md:border-t-0 border-t border-neutral-800">
                      <span className="text-[10px] sm:text-xs font-spartan font-bold tracking-widest text-neutral-400">
                        {collabWorkIndex + 1} / {totalWorks}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCollabWorkIndex(
                              (prev) => (prev - 1 + totalWorks) % totalWorks,
                            );
                          }}
                          className="p-1.5 sm:p-2 bg-neutral-900 hover:bg-yellow-500 hover:text-black text-white rounded-full transition-colors cursor-pointer"
                        >
                          <ChevronLeft size={16} strokeWidth={2.5} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCollabWorkIndex(
                              (prev) => (prev + 1) % totalWorks,
                            );
                          }}
                          className="p-1.5 sm:p-2 bg-neutral-900 hover:bg-yellow-500 hover:text-black text-white rounded-full transition-colors cursor-pointer"
                        >
                          <ChevronRight size={16} strokeWidth={2.5} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
