import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa6";
import { client } from "../sanityClient";

export default function Footer() {
  const [data, setData] = useState(null);

  useEffect(() => {
    client
      .fetch(`*[_type == "globalSettings"][0]`)
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) return null;

  // Safe parsing for the stylized 3-word logo setup
  const brandWords = data.brandName
    ? data.brandName.split(" ")
    : ["Story", "First", "PH"];
  const word1 = brandWords[0] || "Story";
  const word2 = brandWords[1] || "First";
  const word3 = brandWords.slice(2).join(" ") || "PH";

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-900 py-12 px-6 text-center sm:text-left text-xs text-neutral-500 transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center sm:items-start">
          <a
            href="#identity"
            className="flex flex-col text-black dark:text-white leading-[0.85] tracking-tighter transition-colors w-fit items-start text-left mb-3"
          >
            <span className="text-3xl font-anton font-normal uppercase tracking-wide">
              {word1}
            </span>
            <div className="flex items-end">
              <span className="text-3xl font-anton font-normal uppercase tracking-wide">
                {word2}
              </span>
              <span className="text-xs font-spartan font-bold uppercase mb-[2px] ml-1 tracking-normal">
                {word3}
              </span>
            </div>
          </a>
          <p className="font-spartan font-bold tracking-widest uppercase text-[10px] mt-1">
            © {new Date().getFullYear()} {data.footerCopyright}
          </p>
        </div>

        <div className="flex items-center gap-6">
          {data.facebookUrl && (
            <a
              href={data.facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="text-neutral-600 dark:text-neutral-400 hover:text-yellow-500 dark:hover:text-yellow-500 transition-all duration-300 hover:-translate-y-1"
            >
              <FaFacebook size={24} />
            </a>
          )}
          {data.instagramUrl && (
            <a
              href={data.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="text-neutral-600 dark:text-neutral-400 hover:text-yellow-500 dark:hover:text-yellow-500 transition-all duration-300 hover:-translate-y-1"
            >
              <FaInstagram size={24} />
            </a>
          )}
          {data.tiktokUrl && (
            <a
              href={data.tiktokUrl}
              target="_blank"
              rel="noreferrer"
              className="text-neutral-600 dark:text-neutral-400 hover:text-yellow-500 dark:hover:text-yellow-500 transition-all duration-300 hover:-translate-y-1"
            >
              <FaTiktok size={24} />
            </a>
          )}
        </div>
      </div>
    </motion.footer>
  );
}
