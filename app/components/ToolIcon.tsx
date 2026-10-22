'use client'

import { useState } from 'react'
import Image from 'next/image'

type Props = {
  id: string
  name: string
  // ロゴ画像の有無（サーバー側で確認済みの値）。false なら画像を取りに行かない
  hasIcon?: boolean
  size?: number
  className?: string
}

// ツールロゴ。透過・黒ロゴが多いため常に明るいタイルの上に載せる。画像が無ければ頭文字を表示する
export default function ToolIcon({
  id,
  name,
  hasIcon = true,
  size = 32,
  className = '',
}: Props) {
  const [failed, setFailed] = useState(false)
  const inner = Math.round(size * 0.72)
  const showImage = hasIcon && id && !failed

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-md bg-tile ring-1 ring-black/5 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {showImage ? (
        <Image
          src={`/images/tool/${id}.png`}
          width={inner}
          height={inner}
          alt=""
          className="object-contain"
          style={{ width: inner, height: inner }}
          onError={() => setFailed(true)}
        />
      ) : (
        <span
          className="font-mono font-semibold text-neutral-600"
          style={{ fontSize: Math.max(10, size * 0.4) }}
        >
          {name.slice(0, 1).toUpperCase()}
        </span>
      )}
    </span>
  )
}
