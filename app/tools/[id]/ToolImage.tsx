'use client'

import { useState } from 'react'
import Image from 'next/image'
import { getBlurDataURL } from '../../lib/image'

export default function ToolImage({ toolID }: { toolID: string }) {
  const [imageSrc, setImageSrc] = useState(`/images/tool/${toolID}.png`)

  return (
    <Image
      src={imageSrc}
      alt="logo"
      width={50}
      height={55}
      placeholder="blur"
      blurDataURL={getBlurDataURL()}
      onError={() => setImageSrc('/images/noimage.png')}
      className="h-auto max-w-full object-contain"
    />
  )
}
