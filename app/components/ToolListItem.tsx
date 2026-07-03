'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getBlurDataURL } from '../lib/image'

type Props = {
  toolID: string
  toolName: string
  badge?: string
}

export default function ToolListItem({ toolID, toolName, badge }: Props) {
  const [imgSrc, setImgSrc] = useState(`/images/tool/${toolID}.png`)

  return (
    <Link href={`/tools/${toolID}`} className="block">
      <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-gray-100">
        <div className="relative h-8 w-8 shrink-0">
          <Image
            src={imgSrc}
            alt={toolName}
            placeholder="blur"
            blurDataURL={getBlurDataURL()}
            fill
            onError={() => setImgSrc('/images/noimage.png')}
            className="object-contain"
          />
        </div>
        <span className="min-w-0 flex-1 truncate text-sm font-medium text-gray-700">
          {toolName}
        </span>
        {badge && (
          <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
            {badge}
          </span>
        )}
      </div>
    </Link>
  )
}
