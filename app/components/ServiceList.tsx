'use client'

import { useState } from 'react'
import ServiceCard from './ServiceCard'
import type { ServiceSummary } from '../lib/summary'

const ITEMS_PER_PAGE = 24

// 件数の多い一覧を少しずつ表示する（採用サービスが80件を超えるツールがあり、全件描画するとページが重くなる）
export default function ServiceList({ services }: { services: ServiceSummary[] }) {
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE)
  const remaining = services.length - displayCount

  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {services.slice(0, displayCount).map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
      {remaining > 0 && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setDisplayCount((c) => c + ITEMS_PER_PAGE)}
            className="rounded-lg border border-line bg-surface px-6 py-2.5 text-sm text-fg-2 transition-colors hover:border-line-strong hover:text-fg"
          >
            もっと見る（残り {remaining} 件）
          </button>
        </div>
      )}
    </>
  )
}
