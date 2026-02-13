import Link from 'next/link'
import type { Metadata } from 'next'
import Breadcrumb from '../components/Breadcrumb'

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
}

export default function PrivacyPage() {
  return (
    <article>
      <Breadcrumb items={[{ label: 'プライバシーポリシー' }]} />
      <h1 className="text-xl font-bold">プライバシーポリシー</h1>

      <div className="space-y-4 pt-5">
        <p>
          当サイトでは、提供するサービス向上のためにGoogle社のアクセス解析ツール「Google
          アナリティクス」を使用しています。Google
          アナリティクスはデータの収集のためにCookie(※)を使用し、取得されたデータはGoogle社により同社のプライバシーポリシーに基づいて管理されます。
        </p>

        <p>
          Googleアナリティクスに関する説明は、
          <a
            href="https://marketingplatform.google.com/about/analytics/terms/jp/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-external-link hover:underline"
          >
            Googleアナリティクス利用規約
          </a>
          と
          <a
            href="https://policies.google.com/technologies/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="text-external-link hover:underline"
          >
            Googleプライバシーポリシー
          </a>
          をご確認ください。
        </p>

        <p>
          また、Google による情報収集を無効化したい場合は、Google社が提供する
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
            className="text-external-link hover:underline"
          >
            Google アナリティクス オプトアウト アドオン
          </a>
          からオプトアウトの設定が可能です。
        </p>

        <p>
          ※Cookieとは、利用者がウェブサイトに訪問した際、ブラウザーを通して利用者のコンピューターに一時的にデータを記録する仕組みのことです。Cookieには、利用者の端末に関する情報やサイトへの訪問回数といった情報が記録され、サイトへの訪問者としての利用者の識別として利用されます。
        </p>
      </div>

      <div className="mt-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          ホームに戻る
        </Link>
      </div>
    </article>
  )
}
