import { parseISO, format, isValid } from 'date-fns'

export default function Date({ dateString }: { dateString: string }) {
  const date = parseISO(dateString)
  if (!isValid(date)) {
    return <time dateTime="">Invalid date</time>
  }
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
}
