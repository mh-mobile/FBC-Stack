import type { Metadata } from 'next'
import { Suspense } from 'react'
import Script from 'next/script'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import GaTracker from './components/GaTracker'
import { OGP_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from './lib/site'

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  // canonical と og:url はページごとに pageMetadata() で設定する（ここで設定すると全ページに継承されてしまう）
  openGraph: { type: 'website', siteName: SITE_NAME, locale: 'ja_JP', images: [OGP_IMAGE] },
  twitter: { card: 'summary_large_image', images: [OGP_IMAGE] },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="flex min-h-screen flex-col">
        {GA_TRACKING_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <Script
              id="gtag-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_TRACKING_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
        <Suspense fallback={null}>
          <GaTracker />
        </Suspense>
        <a
          href="#main"
          className="sr-only z-50 rounded-md bg-fg px-3 py-2 text-sm text-bg focus:not-sr-only focus:fixed focus:left-4 focus:top-3"
        >
          本文へスキップ
        </a>
        <Header />
        <main id="main" className="mx-auto w-full max-w-6xl flex-1 px-4 pt-6 sm:px-6 sm:pt-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
