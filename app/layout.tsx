import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

export const metadata: Metadata = {
  title: {
    default: 'FBC Stack',
    template: '%s | FBC Stack',
  },
  description:
    'FBC(Fjord Boot Camp)の卒業生が作成したサービスの技術スタックデータベースです。',
  openGraph: {
    type: 'website',
    url: process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000',
    title: 'FBC Stack',
    description:
      'FBC(Fjord Boot Camp)の卒業生が作成したサービスの技術スタックデータベースです。',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'}/images/fbcstack_ogp.png`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FBC Stack',
    description:
      'FBC(Fjord Boot Camp)の卒業生が作成したサービスの技術スタックデータベースです。',
    images: [
      `${process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'}/images/fbcstack_ogp.png`,
    ],
  },
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
      <body className="min-h-screen bg-white text-gray-800 antialiased">
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
        <div className="mx-auto max-w-3xl px-4 py-2">
          <Header />
          <main>{children}</main>
          <footer className="py-5">
            <Footer />
          </footer>
        </div>
      </body>
    </html>
  )
}
