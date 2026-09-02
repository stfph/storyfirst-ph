import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PopupModal } from "react-calendly";
import { client, urlFor } from "../sanityClient";

export default function Services() {
  const [data, setData] = useState({ settings: null, services: [] });
  const [hoveredService, setHoveredService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rootElement, setRootElement] = useState(null);

  useEffect(() => {
    // Set the root element for the Calendly modal to mount onto
    if (typeof window !== "undefined") {
      setRootElement(document.getElementById("root"));
    }

    client
      .fetch(
        `{
      "settings": *[_type == "servicesSettings"][0],
      "services": *[_type == "service"] | order(order asc)
    }`,
      )
      .then(setData)
      .catch(console.error);
  }, []);

  const { settings, services } = data;

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: { staggerChildren: 0.08, staggerDirection: -1 },
    },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
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

  if (!settings) return null;

  return (
    <section
      id="services"
      className="relative py-32 bg-neutral-100 dark:bg-neutral-900 overflow-hidden min-h-[80vh] flex items-center transition-colors duration-500"
    >
      <div className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-1000 ease-in-out">
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${hoveredService === null ? "opacity-100" : "opacity-0"}`}
        >
          {services.length > 0 && services[0].image && (
            <img
              src={urlFor(services[0].image).url()}
              alt="default services background"
              className="w-full h-full object-cover opacity-15 dark:opacity-25 contrast-125 saturate-100 scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-100 via-neutral-100/75 to-neutral-100 dark:from-neutral-900 dark:via-neutral-900/80 dark:to-neutral-900 opacity-95"></div>
        </div>
        {services.map(
          (service) =>
            service.image && (
              <div
                key={`media-${service._id}`}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${hoveredService === service._id ? "opacity-100" : "opacity-0"}`}
              >
                <img
                  src={urlFor(service.image).url()}
                  alt="service background"
                  className="w-full h-full object-cover opacity-25 dark:opacity-35 contrast-125 saturate-110 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-neutral-100 via-neutral-100/50 to-neutral-100 dark:from-neutral-900 dark:via-transparent dark:to-neutral-900 opacity-90"></div>
              </div>
            ),
        )}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="bg-yellow-500 text-black uppercase font-spartan font-bold px-3 py-1 text-[10px] tracking-[0.2em] inline-block mb-4 shadow-sm">
            {settings.badge}
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-anton font-normal text-neutral-950 dark:text-white uppercase tracking-wide leading-[1.1] drop-shadow-xl">
            {settings.headline}
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
          {/* Mapped Services */}
          {services.map((service) => (
            <motion.div
              variants={itemVariants}
              key={service._id}
              className="border-b border-neutral-300 dark:border-neutral-800 py-2"
            >
              <div
                onMouseEnter={() => setHoveredService(service._id)}
                onMouseLeave={() => setHoveredService(null)}
                className={`group flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-16 py-10 px-8 transition-all duration-500 ease-in-out rounded-3xl ${
                  hoveredService === service._id
                    ? "bg-gradient-to-r from-yellow-400 to-yellow-600 scale-[1.01] shadow-2xl"
                    : "hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-600 hover:scale-[1.01] hover:shadow-2xl"
                }`}
              >
                <div className="md:w-[50%]">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-anton font-normal text-neutral-900 dark:text-neutral-100 group-hover:text-black transition-colors duration-500 uppercase tracking-wide drop-shadow-md group-hover:drop-shadow-none">
                    {service.title}
                  </h3>
                </div>

                <div className="md:w-[50%] flex flex-col items-start md:items-end text-left md:text-right">
                  <p className="text-neutral-700 dark:text-neutral-300 group-hover:text-black/90 text-sm leading-relaxed font-montserrat font-medium transition-colors duration-500 drop-shadow-md group-hover:drop-shadow-none mb-6">
                    {service.description}
                  </p>
                  <a
                    href="#work"
                    className="inline-block bg-neutral-950 dark:bg-white text-white dark:text-black group-hover:bg-black group-hover:text-white px-6 py-3 text-[10px] font-spartan font-bold uppercase tracking-[0.2em] transition-colors shadow-lg cursor-pointer"
                  >
                    {settings.buttonText || "Learn More / View Projects"}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Dynamic Booking CTA Banner */}
          {settings.calendlyUrl && (
            <motion.div
              variants={itemVariants}
              className="mt-16 bg-neutral-900 dark:bg-[#050505] border border-neutral-800 p-10 sm:p-14 rounded-3xl flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent z-0 pointer-events-none"></div>
              <div className="relative z-10 lg:w-3/5 text-center lg:text-left">
                <span className="text-yellow-500 font-spartan font-bold uppercase tracking-[0.2em] text-[10px] mb-4 block">
                  {settings.ctaBadge || "Let's Collaborate"}
                </span>
                <h3 className="text-3xl sm:text-4xl font-anton font-normal text-white uppercase tracking-wide leading-[1.1] mb-4">
                  {settings.ctaHeadline || "Ready to tell your story?"}
                </h3>
                <p className="text-neutral-400 font-montserrat font-light text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {settings.ctaDescription ||
                    "Schedule a free 1-on-1 consultation or immersion setup. Available every Saturday and Sunday from 1:00 PM to 10:00 PM."}
                </p>
              </div>
              <div className="relative z-10 lg:w-2/5 flex justify-center lg:justify-end w-full">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-5 font-spartan font-bold uppercase tracking-[0.2em] text-xs transition-colors shadow-[0_0_20px_rgba(234,179,8,0.2)] hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] cursor-pointer"
                >
                  {settings.ctaButtonText || "BOOK A FREE CONSULTATION NOW!"}
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Calendly Popup Modal */}
      {rootElement && settings.calendlyUrl && (
        <PopupModal
          url={settings.calendlyUrl}
          onModalClose={() => setIsModalOpen(false)}
          open={isModalOpen}
          rootElement={rootElement}
        />
      )}
    </section>
  );
}
