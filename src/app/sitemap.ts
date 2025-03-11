import { MetadataRoute } from 'next'
import { appConfig } from "@/lib/appConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = appConfig.baseUrl

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 7,
    }
  ]
}
