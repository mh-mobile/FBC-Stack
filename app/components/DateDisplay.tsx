// frontmatter の日付（YYYY-MM-DD / YYYY-MM）を YYYY.MM.DD 表記で出す
export default function DateDisplay({ dateString }: { dateString: string }) {
  return (
    <time dateTime={dateString} className="font-mono tabular-nums">
      {dateString.replaceAll('-', '.')}
    </time>
  )
}
