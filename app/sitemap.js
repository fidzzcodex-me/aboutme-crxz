import { profile } from "@/data/profile";

export default function sitemap() {
  return [
    {
      url: profile.site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
