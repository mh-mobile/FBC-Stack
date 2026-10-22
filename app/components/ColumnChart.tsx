type Column = {
  label: string
  // ラベルの下に小さく添える補足（例: その年の母数）
  sub?: string
  value: number
  // 柱の上に出す値の表記（例: "42%"）
  display: string
  // ホバー時のツールチップ
  title: string
}

type Props = {
  data: Column[]
  max: number
  caption: string
}

// 年ごとの推移を示す単系列の縦棒グラフ。柱はベースラインから伸ばし、値は柱の上に小さく出す
export default function ColumnChart({ data, max, caption }: Props) {
  return (
    <figure>
      <div
        className="flex h-56 items-end gap-0.5 border-b border-line-strong"
        role="img"
        aria-label={caption}
      >
        {data.map(({ label, value, display, title }) => (
          <div
            key={label}
            title={title}
            className="group flex h-full min-w-0 flex-1 flex-col items-center justify-end"
          >
            <span className="mb-1 font-mono text-[10px] tabular-nums text-muted group-hover:text-fg sm:text-xs">
              {value > 0 ? display : ''}
            </span>
            <div
              className="w-full max-w-10 rounded-t bg-accent opacity-85 transition-opacity group-hover:opacity-100"
              style={{
                height: `${max > 0 ? (value / max) * 80 : 0}%`,
                minHeight: value > 0 ? 2 : 0,
              }}
            />
          </div>
        ))}
      </div>
      <div className="mt-1.5 flex gap-0.5">
        {data.map(({ label, sub }) => (
          <span
            key={label}
            className="min-w-0 flex-1 text-center font-mono text-[10px] text-muted sm:text-xs"
          >
            {label}
            {sub && <span className="block text-[10px] opacity-80">{sub}</span>}
          </span>
        ))}
      </div>
      <figcaption className="sr-only">{caption}</figcaption>
      <table className="sr-only">
        <tbody>
          {data.map(({ label, title }) => (
            <tr key={label}>
              <th>{label}</th>
              <td>{title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  )
}
