# StoryFirst PH — Official Website & CMS Repository

**🌐 Live Website:** [https://stfph.github.io/storyfirst-ph/](https://stfph.github.io/storyfirst-ph/)

This repository contains the complete source code, assets, and content management architecture for the official **StoryFirst PH** website.

The website is built as a modern, high-performance Single Page Application (SPA) using React, styled with Tailwind CSS, and powered by a headless Sanity CMS backend.

---

## 🏗️ Technology Stack & Architecture

- **Frontend:** React.js (via Vite)
- **Styling & Animation:** Tailwind CSS, Framer Motion, Lucide React (Icons)
- **Backend / Database:** Sanity CMS (Headless CMS)
- **Hosting & Deployment:** GitHub Pages (Automated via GitHub Actions)
- **Contact Form:** Web3Forms (Serverless email routing)
- **Booking / Scheduling:** Calendly Integration

---

## 📂 Repository Structure & Assets

The repository is divided into two main environments: the frontend website and the backend CMS studio.

- `/src/` — Contains all React frontend code.
  - `/src/components/` — Individual UI sections (Hero, About, ProjectsGallery, Clients, etc.).
  - `/src/sanityClient.js` — The connection file linking the frontend to the Sanity database.
- `/public/` — Contains static, hardcoded assets that must be publicly accessible to crawlers.
  - `seo-cover.jpg` — The fallback Open Graph image used when sharing the website link on social media. Replace this file with a 1200x630px image to update the social preview.
  - `404.html` — The custom fallback error page.
- `/studio/` — Contains the entire Sanity CMS backend configuration.
  - `/studio/schemaTypes/` — The data structures defining what content can be edited (e.g., `project.js`, `collaborator.js`, `globalSettings.js`).
  - `/studio/sanity.config.js` — The layout and desk structure (with emojis) of the CMS dashboard.
- `index.html` — The entry point of the website. It contains the hardcoded SEO meta tags and Open Graph data required for social media crawlers.

---

## 📝 How to Edit and Update Content (No Coding Required)

All text, images, categories, and video links are managed entirely through the **Sanity Studio CMS**.

1.  **Access the CMS:** Log in to your project at [manage.sanity.io](https://manage.sanity.io/) or your deployed Studio URL.
2.  **Navigate the Dashboard:** Use the left sidebar to navigate through your Content Management sections (Website Settings, Projects Directory, Clients Directory, etc.).
3.  **Publishing Changes:** Any changes made and published in the CMS will instantly and automatically update on the live website. No code deployment is required for content updates.

### Important Note on Video Embeds

When adding the videos to the "Projects" or "Notable Collaborators" pop-up modals, you **must** use the official embed URL format, not the standard browser link:

- **YouTube:** `https://www.youtube.com/embed/VIDEO_ID`
- **TikTok:** `https://www.tiktok.com/embed/v2/VIDEO_ID`
- **Facebook:** `https://www.facebook.com/plugins/video.php?href=ENCODED_VIDEO_URL&show_text=false&width=560`
