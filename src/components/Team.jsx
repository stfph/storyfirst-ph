import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { client, urlFor } from "../sanityClient";

export default function Team() {
  const [data, setData] = useState({ settings: null, team: [] });

  useEffect(() => {
    client
      .fetch(
        `{
      "settings": *[_type == "teamSettings"][0],
      "team": *[_type == "teamMember" && isArchived != true] | order(order asc)
    }`,
      )
      .then(setData)
      .catch(console.error);
  }, []);

  const { settings, team } = data;

  const containerVariants = {
    hidden: {
      opacity: 0,
      rotate: -2,
      scale: 0.96,
      transition: { duration: 0.4 },
    },
    show: {
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, rotate: 3, y: 30, filter: "blur(4px)" },
    show: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 120, damping: 18 },
    },
  };

  if (!settings) return null;

  return (
    <section
      id="team"
      className="py-24 bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-900 transition-colors duration-500 px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: -1 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center flex flex-col items-center justify-center gap-6"
        >
          <div>
            <span className="bg-yellow-500 text-black uppercase font-spartan font-bold px-3 py-1 text-[10px] tracking-widest inline-block mb-4 shadow-sm">
              {settings.badge}
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-anton font-normal text-neutral-950 dark:text-white uppercase tracking-wide leading-[1.1]">
              {settings.headline}
            </h2>
          </div>
          <div className="max-w-xl text-neutral-600 dark:text-neutral-400 font-montserrat font-light leading-relaxed text-center">
            <p>{settings.description}</p>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          exit="hidden"
          viewport={{ once: false, amount: 0.1 }}
          variants={containerVariants}
          className="flex md:flex-wrap md:justify-center overflow-x-auto md:overflow-x-visible snap-x md:snap-none hide-scrollbar gap-6 md:gap-8 lg:gap-12 pb-8 md:pb-0"
        >
          {team.map((member) => {
            const Card = member.linkUrl ? motion.a : motion.div;
            return (
              <Card
                href={member.linkUrl}
                target={member.linkUrl ? "_blank" : undefined}
                rel={member.linkUrl ? "noreferrer" : undefined}
                variants={itemVariants}
                key={member._id}
                className={`group relative overflow-hidden bg-neutral-100 dark:bg-[#0a0a0a] aspect-[3/4] shadow-md hover:shadow-2xl transition-all duration-500 shrink-0 w-[80vw] sm:w-[50vw] md:w-[calc(50%-16px)] lg:w-[calc(25%-36px)] max-w-sm snap-center md:snap-align-none border border-neutral-200 dark:border-neutral-800 ${
                  member.linkUrl ? "cursor-pointer" : "cursor-default"
                }`}
              >
                {member.image && (
                  <motion.img
                    initial={{ scale: 1.15 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    viewport={{ once: false }}
                    src={urlFor(member.image).url()}
                    alt={member.name}
                    className="w-full h-full object-cover object-top filter grayscale-0 md:grayscale opacity-100 md:opacity-90 md:group-hover:grayscale-0 md:group-hover:opacity-100 transition-all duration-700 ease-in-out md:group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-900 -z-10"></div>
                <div className="absolute bottom-0 left-0 w-full p-6 pt-16 transform translate-y-0 md:translate-y-6 md:group-hover:translate-y-0 transition-transform duration-500 ease-out bg-gradient-to-t from-black/95 via-black/70 to-transparent">
                  <h3 className="text-xl sm:text-2xl font-anton font-normal text-white uppercase tracking-wide transform opacity-100 md:opacity-90 md:group-hover:opacity-100 transition-opacity duration-300">
                    {member.name}
                  </h3>
                  <p className="text-yellow-400 text-[10px] sm:text-xs font-spartan font-bold uppercase tracking-widest mt-2 transform opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {member.position}
                  </p>
                </div>
              </Card>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
