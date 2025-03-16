import { appConfig } from "@/lib/appConfig";
import type { MetadataRoute } from "next";

// 强制静态生成
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${appConfig.baseUrl}/sitemap.xml`,
  };
}