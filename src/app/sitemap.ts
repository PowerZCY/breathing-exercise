import { MetadataRoute } from 'next'
import { appConfig } from "@/lib/appConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = appConfig.baseUrl
  const locales = appConfig.i18n.locales

  return locales.map(locale => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))
}
