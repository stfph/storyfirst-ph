import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "3tcl3ri4",
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-03-01",
});

// Setup the image URL builder
const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
