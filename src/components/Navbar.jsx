import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";

export default function Navbar({ isDark, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Work", href: "#work" },
    { name: "Services", href: "#services" },
    { name: "Awards", href: "#awards" },
    { name: "Advocacies", href: "#advocacies" },
    { name: "Team", href: "#team" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md z-40 border-b border-neutral-200 dark:border-neutral-900 transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <a
          href="#hero"
          className="flex flex-col text-black dark:text-white leading-[0.85] tracking-tighter transition-colors w-fit"
        >
          <span className="text-4xl font-black uppercase tracking-tight">
            Story
          </span>
          <div className="flex items-end">
            <span className="text-4xl font-black uppercase tracking-tight">
              First
            </span>
            <span className="text-sm font-bold uppercase mb-[2px] ml-1 tracking-normal">
              PH
            </span>
          </div>
        </a>

        <div className="hidden lg:flex items-center gap-8 text-xs font-black uppercase tracking-[0.1em]">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative group text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors py-2"
            >
              {link.name}
              <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-yellow-500 group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
            </a>
          ))}

          <button
            onClick={toggleTheme}
            className="ml-4 p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-black dark:text-white cursor-pointer"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <div className="lg:hidden flex items-center gap-4 text-black dark:text-white">
          <button onClick={toggleTheme} className="p-2 cursor-pointer">
            {isDark ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none cursor-pointer"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu with Framer Motion slide-down enter/exit animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 px-6 py-6 flex flex-col gap-4 text-center font-bold uppercase tracking-widest overflow-hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-neutral-800 dark:text-neutral-200 hover:text-yellow-500 py-2 border-b border-neutral-100 dark:border-neutral-800"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
