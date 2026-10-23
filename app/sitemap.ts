import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { articles } from "@/content/writing";
import { archive } from "@/content/archive";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/work", "/writing", "/archive", "/about", "/contact"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}` })),
    ...projects.map((p) => ({ url: `${site.url}/work/${p.slug}` })),
    ...articles.map((a) => ({ url: `${site.url}/writing/${a.slug}` })),
    ...archive.map((a) => ({ url: `${site.url}/archive/${a.slug}` })),
  ];
}
