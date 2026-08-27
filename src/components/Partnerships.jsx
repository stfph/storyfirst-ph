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
            {partnershipsData.map((partner, index) => (
              <div
                key={`${i}-${index}`}
                className="flex items-center gap-10 md:gap-16"
              >
                <a
                  href={partner.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-center h-10 md:h-14 min-w-[120px] transition-transform hover:scale-105 cursor-pointer"
                  title={partner.name}
                >
                  <img
                    src={partner.logoUrl}
                    alt={partner.name}
                    className="max-h-full max-w-full object-contain filter grayscale opacity-70 mix-blend-multiply group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "block";
                    }}
                  />
                  {/* Fallback text if the logo image fails to load */}
                  <span className="hidden text-xl md:text-2xl font-black text-black uppercase tracking-tighter whitespace-nowrap hover:text-neutral-800 transition-colors">
                    {partner.name}
                  </span>
                </a>
                <span className="text-black/30 text-lg">✦</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
