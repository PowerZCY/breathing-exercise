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
        src={`https://www.googletagmanager.com/gtag/js?id=G-BVSH0NMBE4`}
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

          gtag('config', 'G-BVSH0NMBE4', {
            page_path: window.location.pathname,
            send_page_view: true
          });
        `}
      </Script>
    </>
  )
}
