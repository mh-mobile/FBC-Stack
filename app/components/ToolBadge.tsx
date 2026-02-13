'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getBlurDataURL } from '../lib/image'

type Props = {
  id: string
  name: string
  version: string
}

export default function ToolBadge({ id, name, version }: Props) {
  const [imageSrc, setImageSrc] = useState(`/images/tool/${id}.png`)

  return (
    <Link href={`/tools/${id}`} className="block">
      <div className="flex min-h-[120px] flex-col items-center justify-center rounded-lg bg-card-bg px-2.5 py-5 transition-shadow hover:shadow-sm">
        <div className="relative mb-3 h-[45px] w-[45px]">
          <Image
            src={imageSrc}
            alt={name}
            placeholder="blur"
            blurDataURL={getBlurDataURL()}
            fill
            onError={() => setImageSrc('/images/noimage.png')}
            className="object-contain"
          />
        </div>
        <div className="break-words px-5 text-center text-sm leading-snug text-light-text">
          {name}
        </div>
        {version && (
          <div className="mt-2 flex w-4/5 justify-center rounded bg-gray-200 p-1 text-xs">
            {version}
          </div>
        )}
      </div>
    </Link>
  )
}
