'use client'
 
import Script from 'next/script'
 
export default function GoogleAnalytics() {
  // 只在生产环境中加载 Google Analytics
  if (process.env.NODE_ENV !== 'production') {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=G-P8NJ93W1K5`}
        strategy="afterInteractive"
      />
      <Script
        id="ga4-analytics"
        strategy="afterInteractive"
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-P8NJ93W1K5', {
            page_path: window.location.pathname,
            send_page_view: true
          });
        `}
      </Script>
    </>
  )
}
