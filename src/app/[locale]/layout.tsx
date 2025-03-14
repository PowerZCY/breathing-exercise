import { appConfig } from "@/lib/appConfig"
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, unstable_setRequestLocale, getTranslations } from 'next-intl/server'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const dynamic = 'force-dynamic'

export async function generateMetadata({ 
  params: paramsPromise 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await paramsPromise;
  const t = await getTranslations({ locale, namespace: 'home' });
  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    metadataBase: new URL(appConfig.baseUrl),
    alternates: {
      canonical: appConfig.baseUrl,
    },
    icons: {
      icon: [
        {
          url: '/favicon.svg',
          type: 'image/svg+xml',
        }
      ],
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
    },
  }
}

export default async function RootLayout({
  children,
  params: paramsPromise  // 重命名参数
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await paramsPromise;  // 使用新名称
  unstable_setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}