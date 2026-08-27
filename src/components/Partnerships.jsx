import React from "react";
import { partnershipsData } from "../data/portfolioData";

export default function Partnerships() {
  return (
    <section className="py-6 bg-yellow-500 overflow-hidden flex items-center border-y-2 border-neutral-200 dark:border-neutral-900 transition-colors duration-500">
      <div className="flex w-fit animate-marquee hover:[animation-play-state:paused] cursor-default">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="flex shrink-0 items-center gap-10 md:gap-16 px-6 md:px-8"
          >
            {partnershipsData.map((partner, index) => {
              // Ensure proper path resolution for Vite on GitHub Pages
              const imagePath = partner.logoUrl.startsWith("./")
                ? `${import.meta.env.BASE_URL}${partner.logoUrl.slice(2)}`
                : partner.logoUrl;

              return (
                <div
                  key={`${i}-${index}`}
                  className="flex items-center gap-10 md:gap-16"
                >
                  <a
                    href={partner.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-center h-12 min-w-[100px] transition-transform hover:scale-105 cursor-pointer"
                    title={partner.name}
                  >
                    <img
                      src={imagePath}
                      alt={partner.name}
                      // Strictly constrain the max-height to keep the rail uniform
                      className="max-h-8 md:max-h-10 w-auto object-contain filter grayscale opacity-70 mix-blend-multiply group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "block";
                      }}
                    />
                    {/* Downscaled fallback text to synchronize visual weight with logos */}
                    <span className="hidden text-sm md:text-base font-black text-black uppercase tracking-widest whitespace-nowrap hover:text-neutral-800 transition-colors">
                      {partner.name}
                    </span>
                  </a>
                  <span className="text-black/30 text-lg">✦</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
