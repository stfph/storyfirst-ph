import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { client, urlFor } from "../sanityClient";

export default function Navbar({ isDark, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    client
      .fetch(`*[_type == "globalSettings"][0]`)
      .then((res) => {
        setData(res);

        // Dynamically update the website favicon
        if (res?.websiteIcon) {
          const iconUrl = urlFor(res.websiteIcon).width(64).height(64).url();
          let link = document.querySelector("link[rel~='icon']");
          if (!link) {
            link = document.createElement("link");
            link.rel = "icon";
            document.head.appendChild(link);
          }
          link.href = iconUrl;
        }
      })
      .catch(console.error);
  }, []);

  const brandWords = data?.brandName
    ? data.brandName.split(" ")
    : ["Story", "First", "PH"];
  const word1 = brandWords[0] || "Story";
  const word2 = brandWords[1] || "First";
  const word3 = brandWords.slice(2).join(" ") || "PH";

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
          {data?.brandLogo ? (
            <img
              src={urlFor(data.brandLogo).height(56).url()}
              alt={data?.brandName || "STORYFIRST PH"}
              className="h-12 w-auto object-contain"
            />
          ) : (
            <>
              <span className="text-4xl font-anton font-normal uppercase tracking-wide">
                {word1}
              </span>
              <div className="flex items-end">
                <span className="text-4xl font-anton font-normal uppercase tracking-wide">
                  {word2}
                </span>
                <span className="text-sm font-spartan font-bold uppercase mb-[4px] ml-1 tracking-normal">
                  {word3}
                </span>
              </div>
            </>
          )}
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 text-[11px] font-spartan font-bold uppercase tracking-widest">
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
            className="ml-4 p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-black dark:text-white cursor-pointer flex items-center justify-center"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mobile Navbar Controls */}
        <div className="lg:hidden flex items-center gap-4 text-black dark:text-white">
          <button
            onClick={toggleTheme}
            className="p-2 cursor-pointer flex items-center justify-center"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none cursor-pointer p-2 flex items-center justify-center"
            aria-label="Toggle Menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Slide-Out Drawer & Backdrop Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-screen w-[80%] max-w-sm bg-white dark:bg-neutral-950 border-l border-neutral-200 dark:border-neutral-800 shadow-2xl z-50 flex flex-col justify-between py-8 px-8 lg:hidden overflow-y-auto"
            >
              <div className="flex justify-between items-center pb-6 border-b border-neutral-200 dark:border-neutral-800">
                <span className="text-xs font-spartan font-bold uppercase tracking-widest text-neutral-400">
                  Navigation
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-black dark:text-white cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-full transition-colors flex items-center justify-center"
                  aria-label="Close Menu"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col gap-6 text-left py-6 my-auto">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + 0.1 }}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-xl font-spartan font-bold uppercase tracking-widest text-neutral-900 dark:text-white hover:text-yellow-500 dark:hover:text-yellow-500 transition-colors border-b border-neutral-100 dark:border-neutral-900 pb-4"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="pt-6 border-t border-neutral-200 dark:border-neutral-800 text-[10px] font-spartan font-bold text-neutral-500 uppercase tracking-widest"
              >
                <p>StoryFirst PH © {new Date().getFullYear()}</p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
