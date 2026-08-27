import React from "react";
import { motion } from "framer-motion";
import { testimonialsData } from "../data/portfolioData";
import { Quote } from "lucide-react";

export default function Testimonials() {
  // Framer Motion variants for bi-directional enter/exit scroll animation
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
      id="testimonials"
      className="py-24 bg-neutral-100 dark:bg-[#0a0a0a] border-t border-neutral-200 dark:border-neutral-900 transition-colors duration-500 px-6 overflow-hidden"
    >
      {/* Hide scrollbar for mobile swipeable layout */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `,
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
          <span className="bg-yellow-500 text-black uppercase font-black px-3 py-1 text-[10px] tracking-[0.2em] inline-block mb-4 shadow-sm">
            Client Feedback
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-neutral-950 dark:text-white uppercase tracking-tight">
            What They Say
          </h2>
        </motion.div>

        {/* Testimonials Gallery: Horizontal Swipe on Mobile, Grid on Desktop with Bi-directional Animations */}
        <motion.div
          initial="hidden"
          whileInView="show"
          exit="hidden"
          viewport={{ once: false, amount: 0.1 }}
          variants={containerVariants}
          className="flex md:grid overflow-x-auto md:overflow-x-visible snap-x md:snap-none hide-scrollbar gap-6 md:gap-8 pb-8 md:pb-0 md:grid-cols-2 lg:grid-cols-3"
        >
          {testimonialsData.map((testimonial) => (
            <motion.div
              variants={itemVariants}
              key={testimonial.id}
              className="bg-white dark:bg-neutral-950 p-10 border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 shrink-0 w-[85vw] sm:w-[60vw] md:w-auto snap-center md:snap-align-none"
            >
              {/* Quote Content */}
              <div>
                <Quote size={40} className="text-yellow-500/30 mb-6" />
                <p className="text-neutral-700 dark:text-neutral-300 text-base leading-relaxed mb-8 font-medium italic">
                  "{testimonial.quote}"
                </p>
              </div>

              {/* Client Info */}
              <div className="border-t border-neutral-100 dark:border-neutral-800 pt-6 mt-auto">
                <p className="text-neutral-900 dark:text-white font-black uppercase tracking-widest text-sm">
                  {testimonial.name}
                </p>
                <p className="text-yellow-600 dark:text-yellow-500 text-[10px] font-bold uppercase tracking-[0.15em] mt-1">
                  {testimonial.position}
                </p>
                <p className="text-neutral-500 dark:text-neutral-500 text-xs font-medium mt-1">
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
