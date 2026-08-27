import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import ProjectsGallery from "./components/ProjectsGallery";
import Awards from "./components/Awards";
import Partnerships from "./components/Partnerships";
import Clients from "./components/Clients";
import Advocacies from "./components/Advocacies";
import Testimonials from "./components/Testimonials";
import Team from "./components/Team";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import paperTexture from "./assets/paper-texture.png";

export default function App() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className="select-none bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white min-h-screen selection:bg-yellow-500 selection:text-black transition-colors duration-500 relative">
      <div
        className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-30 mix-blend-multiply dark:invert dark:mix-blend-screen dark:opacity-15 transition-all duration-500"
        style={{
          backgroundImage: `url(${paperTexture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="relative z-10">
        <Navbar isDark={isDark} toggleTheme={toggleTheme} />
        <main>
          <Hero />
          <About />
          <Services />
          <ProjectsGallery />
          <Awards />
          <Partnerships />
          <Clients />
          <Advocacies />
          <Testimonials />
          <Team />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
