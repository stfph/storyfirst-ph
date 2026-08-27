import React from "react";
import { clientsData, collaboratorsData } from "../data/portfolioData";

export default function Clients() {
  return (
    <section
      id="clients"
      className="py-24 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 transition-colors duration-500 px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* --- CLIENTS & PARTNERS SECTION --- */}
        <div className="mb-16">
          <span className="bg-yellow-500 text-black uppercase font-black px-3 py-1 text-[10px] tracking-[0.2em] inline-block mb-4 shadow-sm">
            Trusted By
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-neutral-950 dark:text-white uppercase tracking-tight leading-[0.95]">
            Clients & Collaborators
          </h2>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400 font-medium max-w-2xl leading-relaxed">
            We cover, pitch, and produce stories for various media
            organizations, and fix production needs for foreign media working in
            the Philippines.
          </p>
        </div>

        {/* Categorized Client Wall */}
        <div className="space-y-12">
          {/* Media & Production */}
          <div>
            <h3 className="text-[10px] font-black tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500 mb-6 border-b border-neutral-200 dark:border-neutral-800 pb-2">
              Media & Production
            </h3>
            <div className="flex flex-wrap gap-4">
              {clientsData.media.map((client, index) => (
                <a
                  key={index}
                  href={client.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-center px-6 py-4 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:border-yellow-500 dark:hover:border-yellow-500 transition-colors cursor-pointer min-w-[140px] h-20"
                  title={client.name}
                >
                  <img
                    src={client.logoUrl}
                    alt={client.name}
                    className="max-h-full max-w-full object-contain filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "block";
                    }}
                  />
                  <span className="hidden text-xs font-bold uppercase tracking-wider text-center text-neutral-800 dark:text-neutral-200 group-hover:text-yellow-500 transition-colors">
                    {client.name}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Brands & Corporations */}
          <div>
            <h3 className="text-[10px] font-black tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500 mb-6 border-b border-neutral-200 dark:border-neutral-800 pb-2">
              Brands & Corporations
            </h3>
            <div className="flex flex-wrap gap-4">
              {clientsData.brands.map((client, index) => (
                <a
                  key={index}
                  href={client.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-center px-6 py-4 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:border-yellow-500 dark:hover:border-yellow-500 transition-colors cursor-pointer min-w-[140px] h-20"
                  title={client.name}
                >
                  <img
                    src={client.logoUrl}
                    alt={client.name}
                    className="max-h-full max-w-full object-contain filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "block";
                    }}
                  />
                  <span className="hidden text-xs font-bold uppercase tracking-wider text-center text-neutral-800 dark:text-neutral-200 group-hover:text-yellow-500 transition-colors">
                    {client.name}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Organizations & NGOs */}
          <div>
            <h3 className="text-[10px] font-black tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500 mb-6 border-b border-neutral-200 dark:border-neutral-800 pb-2">
              Organizations & NGOs
            </h3>
            <div className="flex flex-wrap gap-4">
              {clientsData.organizations.map((client, index) => (
                <a
                  key={index}
                  href={client.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-center px-6 py-4 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:border-yellow-500 dark:hover:border-yellow-500 transition-colors cursor-pointer min-w-[140px] h-20"
                  title={client.name}
                >
                  <img
                    src={client.logoUrl}
                    alt={client.name}
                    className="max-h-full max-w-full object-contain filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "block";
                    }}
                  />
                  <span className="hidden text-xs font-bold uppercase tracking-wider text-center text-neutral-800 dark:text-neutral-200 group-hover:text-yellow-500 transition-colors">
                    {client.name}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Education & Institutions */}
          <div>
            <h3 className="text-[10px] font-black tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500 mb-6 border-b border-neutral-200 dark:border-neutral-800 pb-2">
              Education & Institutions
            </h3>
            <div className="flex flex-wrap gap-4">
              {clientsData.institutions.map((client, index) => (
                <a
                  key={index}
                  href={client.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-center px-6 py-4 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:border-yellow-500 dark:hover:border-yellow-500 transition-colors cursor-pointer min-w-[140px] h-20"
                  title={client.name}
                >
                  <img
                    src={client.logoUrl}
                    alt={client.name}
                    className="max-h-full max-w-full object-contain filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "block";
                    }}
                  />
                  <span className="hidden text-xs font-bold uppercase tracking-wider text-center text-neutral-800 dark:text-neutral-200 group-hover:text-yellow-500 transition-colors">
                    {client.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* --- PEOPLE WE'VE WORKED WITH SECTION --- */}
        <div className="mt-32">
          <div className="mb-12">
            <span className="bg-yellow-500 text-black uppercase font-black px-3 py-1 text-[10px] tracking-[0.2em] inline-block mb-4 shadow-sm">
              Notable Collaborators
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-neutral-950 dark:text-white uppercase tracking-tight leading-none">
              People We've Worked With
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {collaboratorsData.map((person) => (
              <div
                key={person.id}
                className="group relative overflow-hidden bg-neutral-200 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 aspect-square"
              >
                {/* Portrait Image */}
                <img
                  src={person.imageUrl}
                  alt={person.name}
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out group-hover:scale-105"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />

                {/* Fallback pattern if image is missing */}
                <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 -z-10"></div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

                {/* Text Content */}
                <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h4 className="text-xl font-black text-white uppercase tracking-wide">
                    {person.name}
                  </h4>
                  <p className="text-yellow-500 text-xs font-bold uppercase tracking-wider mt-1">
                    {person.context}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
