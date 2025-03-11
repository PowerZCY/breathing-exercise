import { appConfig } from "@/lib/appConfig"
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, unstable_setRequestLocale } from 'next-intl/server'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Breathing Exercise',
  description: 'Practice guided belly breathing exercises for stress relief, better health, and for all mankind.',
  keywords: 'breathing exercise, meditation, stress relief, diaphragmatic breathing, belly breathing,mindfulness, internationalized, support for 20 languages',
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
    title: 'Breathing Exercise',
    description: 'Practice guided belly breathing exercises for stress relief, better health, and for all mankind.',
    type: 'website',
  },
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
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