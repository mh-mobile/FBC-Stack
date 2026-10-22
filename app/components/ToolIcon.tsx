'use client'

import { useState } from 'react'
import Image from 'next/image'

type Props = {
  id: string
  name: string
  size?: number
  className?: string
}

// ツールロゴ。透過・黒ロゴが多いため常に明るいタイルの上に載せる。画像が無ければ頭文字を表示する
export default function ToolIcon({
  id,
  name,
  size = 32,
  className = '',
}: Props) {
  const [failed, setFailed] = useState(false)
  const inner = Math.round(size * 0.72)

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-md bg-tile ring-1 ring-black/5 ${className}`}
      style={{ width: size, height: size }}
    >
      {failed ? (
        <span
          className="font-mono font-semibold text-neutral-500"
          style={{ fontSize: Math.max(10, size * 0.4) }}
          aria-hidden="true"
        >
          {name.slice(0, 1).toUpperCase()}
        </span>
      ) : (
        <Image
          src={`/images/tool/${id}.png`}
          width={inner}
          height={inner}
          alt=""
          aria-hidden="true"
          className="object-contain"
          style={{ width: inner, height: inner }}
          onError={() => setFailed(true)}
        />
      )}
    </span>
  )
}
