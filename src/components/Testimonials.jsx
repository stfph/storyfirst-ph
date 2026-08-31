import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { client } from "../sanityClient";

export default function Testimonials() {
  const [data, setData] = useState({ settings: null, testimonials: [] });

  useEffect(() => {
    client
      .fetch(
        `{
      "settings": *[_type == "testimonialsSettings"][0],
      "testimonials": *[_type == "testimonial"]
    }`,
      )
      .then(setData)
      .catch(console.error);
  }, []);

  const { settings, testimonials } = data;

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
      id="testimonials"
      className="py-24 bg-neutral-100 dark:bg-[#0a0a0a] border-t border-neutral-200 dark:border-neutral-900 transition-colors duration-500 px-6 overflow-hidden"
    >
      <style
        dangerouslySetInnerHTML={{
          __html: ` .hide-scrollbar::-webkit-scrollbar { display: none; } .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; } `,
        }}
      />
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="bg-yellow-500 text-black uppercase font-spartan font-bold px-3 py-1 text-[10px] tracking-[0.2em] inline-block mb-4 shadow-sm">
            {settings.badge}
          </span>
          <h2 className="text-4xl sm:text-5xl font-anton font-normal text-neutral-950 dark:text-white uppercase tracking-wide leading-[1.1]">
            {settings.headline}
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          exit="hidden"
          viewport={{ once: false, amount: 0.1 }}
          variants={containerVariants}
          className="flex flex-wrap justify-center gap-6 md:gap-8 pb-8 md:pb-0"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              variants={itemVariants}
              key={testimonial._id}
              className="bg-white dark:bg-neutral-950 p-10 border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 shrink-0 w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)]"
            >
              <div>
                <Quote size={40} className="text-yellow-500/30 mb-6" />
                <p className="text-neutral-700 dark:text-neutral-300 text-base leading-relaxed mb-8 font-montserrat font-light italic">
                  "{testimonial.quote}"
                </p>
              </div>
              <div className="border-t border-neutral-100 dark:border-neutral-800 pt-6 mt-auto">
                <p className="text-neutral-900 dark:text-white font-spartan font-bold uppercase tracking-widest text-sm">
                  {testimonial.name}
                </p>
                <p className="text-yellow-600 dark:text-yellow-500 text-[10px] font-spartan font-bold uppercase tracking-[0.15em] mt-1">
                  {testimonial.position}
                </p>
                <p className="text-neutral-500 dark:text-neutral-500 text-xs font-montserrat font-light mt-2">
                  {testimonial.company}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
