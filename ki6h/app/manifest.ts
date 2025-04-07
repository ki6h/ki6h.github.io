import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ki6h Portfolio",
    short_name: "ki6h",
    description: "Portfolio of ki6h, Cybersecurity Expert & Exploit Developer",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#a56d4f",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  }
}

