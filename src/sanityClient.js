// src/sanityClient.js
import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "3tcl3ri4", // You will replace this
  dataset: "production",
  useCdn: true, // Speeds up loading for visitors by caching data
  apiVersion: "2024-03-01",
});
