import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { client } from "../sanityClient";

export default function Contact() {
  const [data, setData] = useState({ contact: null, global: null });
  const [isSent, setIsSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    message: "",
  });

  useEffect(() => {
    client
      .fetch(
        `{
      "contact": *[_type == "contactSettings"][0],
      "global": *[_type == "globalSettings"][0]
    }`,
      )
      .then((res) => {
        setData(res);
        // Automatically set the default dropdown value to the first category in the CMS
        if (res.contact?.inquiryCategories?.length > 0) {
          setFormData((prev) => ({
            ...prev,
            category: res.contact.inquiryCategories[0],
          }));
        }
      })
      .catch(console.error);
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSent(true);
    // Reset form and revert category back to the dynamic default
    setFormData({
      name: "",
      email: "",
      category: data.contact?.inquiryCategories?.[0] || "",
      message: "",
    });
    setTimeout(() => setIsSent(false), 3000);
  };

  const { contact, global } = data;

  if (!contact || !global) return null;

  // Fallback array just in case the CMS array is emptied accidentally
  const categories =
    contact.inquiryCategories?.length > 0
      ? contact.inquiryCategories
      : ["General Inquiry"];

  return (
    <section
      id="contact"
      className="py-24 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 px-6 transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Side: Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 space-y-6"
        >
          <span className="bg-yellow-500 text-black uppercase font-spartan font-bold px-3 py-1 text-[10px] tracking-widest inline-block shadow-sm">
            {contact.badge}
          </span>
          <h2 className="text-4xl sm:text-5xl font-anton font-normal text-neutral-950 dark:text-white uppercase tracking-wide leading-[1.1]">
            {contact.headline}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">
              {contact.highlightText}
            </span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-base leading-relaxed font-montserrat font-medium">
            {contact.description}
          </p>

          <div className="pt-6 space-y-6 select-text">
            <div className="flex items-center gap-5">
              <div className="flex items-center justify-center w-12 h-12 bg-yellow-500 text-black rounded-full shadow-lg shadow-yellow-500/20 shrink-0">
                <Mail size={20} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[10px] font-spartan font-bold tracking-[0.2em] uppercase text-neutral-400">
                  Email Inquiries
                </p>
                <a
                  href={`mailto:${global.contactEmail}`}
                  className="text-neutral-950 dark:text-white font-bold text-lg hover:text-yellow-500 transition-colors"
                >
                  {global.contactEmail}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div className="flex items-center justify-center w-12 h-12 bg-yellow-500 text-black rounded-full shadow-lg shadow-yellow-500/20 shrink-0">
                <Phone size={20} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[10px] font-spartan font-bold tracking-[0.2em] uppercase text-neutral-400">
                  Direct Line
                </p>
                <p className="text-neutral-950 dark:text-white font-bold text-lg">
                  {global.contactPhone}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div className="flex items-center justify-center w-12 h-12 bg-yellow-500 text-black rounded-full shadow-lg shadow-yellow-500/20 shrink-0">
                <MapPin size={20} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[10px] font-spartan font-bold tracking-[0.2em] uppercase text-neutral-400">
                  Location & Base
                </p>
                <p className="text-neutral-950 dark:text-white font-bold text-lg">
                  {global.contactLocation}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Editable Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 30 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7"
        >
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-neutral-950 p-8 sm:p-10 border border-neutral-200 dark:border-neutral-800 space-y-6 shadow-xl"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-spartan font-bold tracking-widest uppercase text-neutral-500 dark:text-neutral-400 mb-2">
                  {contact.nameLabel || "Your Name *"}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={contact.namePlaceholder || "Juan Dela Cruz"}
                  className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-4 py-3.5 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 text-sm font-montserrat font-light focus:outline-none focus:border-yellow-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] font-spartan font-bold tracking-widest uppercase text-neutral-500 dark:text-neutral-400 mb-2">
                  {contact.emailLabel || "Email Address *"}
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={contact.emailPlaceholder || "juan@company.com"}
                  className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-4 py-3.5 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 text-sm font-montserrat font-light focus:outline-none focus:border-yellow-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-spartan font-bold tracking-widest uppercase text-neutral-500 dark:text-neutral-400 mb-2">
                {contact.categoryLabel || "Inquiry Category *"}
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-4 py-3.5 text-neutral-900 dark:text-white text-sm font-montserrat font-light focus:outline-none focus:border-yellow-500 transition-colors cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-spartan font-bold tracking-widest uppercase text-neutral-500 dark:text-neutral-400 mb-2">
                {contact.messageLabel || "Project Details / Message *"}
              </label>
              <textarea
                rows="5"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                placeholder={
                  contact.messagePlaceholder || "Tell us about the story..."
                }
                className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-4 py-3.5 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 text-sm font-montserrat font-light focus:outline-none focus:border-yellow-500 resize-none transition-colors"
              ></textarea>
            </div>

            <button
              type="submit"
              className={`w-full font-spartan font-bold uppercase py-4 text-xs tracking-widest flex items-center justify-center transition-all duration-300 active:scale-98 cursor-pointer ${isSent ? "bg-emerald-600 text-white" : "bg-yellow-500 hover:bg-yellow-400 text-black shadow-lg shadow-yellow-500/20"}`}
            >
              {isSent
                ? contact.successMessage || "INQUIRY SENT SUCCESSFULLY!"
                : contact.submitButtonText || "SEND INQUIRY"}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
