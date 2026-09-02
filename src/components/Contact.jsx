import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { client } from "../sanityClient";

export default function Contact() {
  const [data, setData] = useState({ contact: null, global: null });
  const [isSent, setIsSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.contact?.web3formsAccessKey) {
      alert(
        "Form submission is currently unavailable. Please configure the Access Key in the CMS.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: data.contact.web3formsAccessKey,
          subject: `New Inquiry from StoryFirst PH: ${formData.category}`,
          from_name: formData.name,
          email: formData.email,
          category: formData.category,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSent(true);
        setFormData({
          name: "",
          email: "",
          category: data.contact?.inquiryCategories?.[0] || "",
          message: "",
        });
        setTimeout(() => setIsSent(false), 3000);
      } else {
        alert("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const { contact, global } = data;

  if (!contact || !global) return null;

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
            {/* Plain Text Email */}
            <div className="flex items-center gap-5">
              <div className="flex items-center justify-center w-12 h-12 bg-yellow-500 text-black rounded-full shadow-lg shadow-yellow-500/20 shrink-0">
                <Mail size={20} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[10px] font-spartan font-bold tracking-[0.2em] uppercase text-neutral-400">
                  {global.emailLabel || "Email Inquiries"}
                </p>
                <p className="text-neutral-950 dark:text-white font-bold text-lg mt-1">
                  {global.contactEmail}
                </p>
              </div>
            </div>

            {/* Plain Text Phone */}
            <div className="flex items-center gap-5">
              <div className="flex items-center justify-center w-12 h-12 bg-yellow-500 text-black rounded-full shadow-lg shadow-yellow-500/20 shrink-0">
                <Phone size={20} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[10px] font-spartan font-bold tracking-[0.2em] uppercase text-neutral-400">
                  {global.phoneLabel || "Direct Line"}
                </p>
                <p className="text-neutral-950 dark:text-white font-bold text-lg mt-1">
                  {global.contactPhone}
                </p>
              </div>
            </div>

            {/* Plain Text Location */}
            <div className="flex items-center gap-5">
              <div className="flex items-center justify-center w-12 h-12 bg-yellow-500 text-black rounded-full shadow-lg shadow-yellow-500/20 shrink-0">
                <MapPin size={20} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[10px] font-spartan font-bold tracking-[0.2em] uppercase text-neutral-400">
                  {global.locationLabel || "Location & Base"}
                </p>
                <p className="text-neutral-950 dark:text-white font-bold text-lg mt-1">
                  {global.contactLocation}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Web3Forms Integrated Form */}
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
              disabled={isSubmitting}
              className={`w-full font-spartan font-bold uppercase py-4 text-xs tracking-widest flex items-center justify-center transition-all duration-300 active:scale-98 cursor-pointer ${
                isSent
                  ? "bg-emerald-600 text-white"
                  : isSubmitting
                    ? "bg-neutral-400 text-neutral-800 cursor-not-allowed"
                    : "bg-yellow-500 hover:bg-yellow-400 text-black shadow-lg shadow-yellow-500/20"
              }`}
            >
              {isSubmitting
                ? "SENDING..."
                : isSent
                  ? contact.successMessage || "INQUIRY SENT SUCCESSFULLY!"
                  : contact.submitButtonText || "SEND INQUIRY"}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
