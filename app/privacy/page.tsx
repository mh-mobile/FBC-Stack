import type { Metadata } from 'next'
import Breadcrumb from '../components/Breadcrumb'
import { pageMetadata } from '../lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'プライバシーポリシー',
  path: '/privacy',
})

export default function PrivacyPage() {
  return (
    <article className="max-w-3xl text-[15px] leading-relaxed text-fg-2">
      <Breadcrumb items={[{ label: 'プライバシーポリシー' }]} />
      <h1 className="text-2xl font-bold tracking-tight text-fg sm:text-3xl">
        プライバシーポリシー
      </h1>

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
            className="text-accent hover:underline"
          >
            Googleアナリティクス利用規約
          </a>
          と
          <a
            href="https://policies.google.com/technologies/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
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
            className="text-accent hover:underline"
          >
            Google アナリティクス オプトアウト アドオン
          </a>
          からオプトアウトの設定が可能です。
        </p>

        <p>
          ※Cookieとは、利用者がウェブサイトに訪問した際、ブラウザーを通して利用者のコンピューターに一時的にデータを記録する仕組みのことです。Cookieには、利用者の端末に関する情報やサイトへの訪問回数といった情報が記録され、サイトへの訪問者としての利用者の識別として利用されます。
        </p>
      </div>
    </article>
  )
}
