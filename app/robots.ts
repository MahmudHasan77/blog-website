import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: ["/admin/*"], // you can add more paths here
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
