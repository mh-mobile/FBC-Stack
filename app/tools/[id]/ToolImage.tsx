'use client'

import { useState } from 'react'
import Image from 'next/image'
import { getBlurDataURL } from '../../lib/image'

export default function ToolImage({ toolID, toolName }: { toolID: string; toolName?: string }) {
  const [imageSrc, setImageSrc] = useState(`/images/tool/${toolID}.png`)

  return (
    <div className="relative h-14 w-14">
      <Image
        src={imageSrc}
        alt={toolName ?? toolID}
        fill
        placeholder="blur"
        blurDataURL={getBlurDataURL()}
        onError={() => setImageSrc('/images/noimage.png')}
        className="object-contain"
      />
    </div>
  )
}
