import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/",
          "/api",
          "/api/",
          "/login",
          "/success",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/",
          "/api",
          "/api/",
          "/login",
          "/success",
        ],
      },
    ],
    sitemap: "https://putraadityamotor.id/sitemap.xml",
    host: "https://putraadityamotor.id",
  };
}
