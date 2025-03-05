import { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { appConfig } from "./lib/appConfig";

/* 
- 检查 URL 是否包含语言前缀
- 如果没有语言前缀，根据用户浏览器设置添加默认语言
- 处理语言切换的重定向
- 验证请求的语言是否在支持列表中
例如：

- 访问 /admin → 可能重定向到 /en/admin 或 /zh/admin
- 访问 /about → 可能重定向到 /en/about 或 /zh/about
- 访问 /fr/about （不支持的语言）→ 重定向到默认语言
这样设计确保：

1. 所有页面都有正确的语言前缀
2. 用户总是看到合适的语言版本
3. 权限验证和语言处理可以同时工作
 */
const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: appConfig.i18n.locales,

  // Used when no locale matches
  defaultLocale: appConfig.i18n.defaultLocale,
  localePrefix: "always"  // 改为 always，确保始终使用语言前缀
});

export function middleware(request: NextRequest) {
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // 修改 matcher 配置以确保正确匹配所有路由
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};