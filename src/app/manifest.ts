import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Teragenix",
    short_name: "Teragenix",
    description: "Research grade peptides with clear specs, batch documentation, and product details you can verify before you buy.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#3b6ed6",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
