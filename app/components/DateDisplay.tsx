import { parseISO, format } from 'date-fns'

export default function DateDisplay({ dateString }: { dateString: string }) {
  return (
    <time dateTime={dateString} className="font-mono tabular-nums">
      {format(parseISO(dateString), 'yyyy.MM.dd')}
    </time>
  )
}
