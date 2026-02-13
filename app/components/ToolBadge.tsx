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
      <div className="flex min-h-[100px] flex-col items-center justify-center rounded-xl bg-gray-50 px-2.5 py-4 transition-all hover:bg-gray-100 hover:shadow-sm">
        <div className="relative mb-2 h-10 w-10">
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
        <div className="break-words text-center text-xs font-medium leading-snug text-gray-700">
          {name}
        </div>
        {version && (
          <div className="mt-1.5 rounded-full bg-gray-200 px-2 py-0.5 text-[10px] font-medium text-gray-500">
            {version}
          </div>
        )}
      </div>
    </Link>
  )
}
