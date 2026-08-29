import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="py-32 bg-white dark:bg-neutral-950 transition-colors duration-500 px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <span className="bg-yellow-500 text-black uppercase font-spartan font-bold px-3 py-1 text-[10px] tracking-widest inline-block w-fit mb-6 shadow-sm">
              Our Philosophy
            </span>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-anton font-normal text-neutral-950 dark:text-white uppercase tracking-wide leading-[1.1]">
              The Story
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">
                Comes First.
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 flex flex-col justify-center space-y-8 text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed font-montserrat font-light"
          >
            <p className="text-2xl text-neutral-900 dark:text-neutral-200 font-montserrat font-medium leading-snug">
              Meaningful communication begins with understanding people,
              context, and the story that needs to be told.
            </p>
            <p>
              Established with deep roots in documentary and journalism,{" "}
              <strong className="text-black dark:text-white font-montserrat font-medium">
                StoryFirst PH
              </strong>{" "}
              has evolved into a full-service creative communications and
              production company. We look beyond platforms, formats, or empty
              spectacles to focus on what truly matters: responsible,
              well-researched storytelling.
            </p>
            <p>
              From our founder's early experience in the field to our current
              capabilities as a comprehensive team, we have collaborated with
              both Philippine and international organizations to produce
              human-centered visual narratives that resonate, educate, and
              inspire.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
