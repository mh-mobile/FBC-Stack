// サイト内で使う線画アイコン（24x24, stroke）
type Props = { className?: string }

function Svg({ className = 'h-4 w-4', d }: Props & { d: string | string[] }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.75}
      stroke="currentColor"
      aria-hidden="true"
    >
      {(Array.isArray(d) ? d : [d]).map((p) => (
        <path key={p} strokeLinecap="round" strokeLinejoin="round" d={p} />
      ))}
    </svg>
  )
}

export const SearchIcon = (p: Props) => (
  <Svg
    {...p}
    d="M21 21l-5.2-5.2m0 0A7.5 7.5 0 105.2 5.2a7.5 7.5 0 0010.6 10.6z"
  />
)
export const ExternalIcon = (p: Props) => (
  <Svg
    {...p}
    d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
  />
)
export const GlobeIcon = (p: Props) => (
  <Svg
    {...p}
    d={[
      'M12 21a9 9 0 100-18 9 9 0 000 18z',
      'M3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 010 18M12 3a15 15 0 000 18',
    ]}
  />
)
export const BookIcon = (p: Props) => (
  <Svg
    {...p}
    d="M12 6.04A8.97 8.97 0 006 3.75c-1.05 0-2.06.18-3 .51v14.25A8.99 8.99 0 016 18c2.3 0 4.4.87 6 2.29m0-14.25a8.97 8.97 0 016-2.29c1.05 0 2.06.18 3 .51v14.25A8.99 8.99 0 0018 18a8.97 8.97 0 00-6 2.29m0-14.25v14.25"
  />
)
export const WikiIcon = (p: Props) => (
  <Svg
    {...p}
    d="M9.75 3.1v5.71a2.25 2.25 0 01-.66 1.59L5 14.5M9.75 3.1c-.25.02-.5.05-.75.08m.75-.08a24.3 24.3 0 014.5 0m0 0v5.71c0 .6.24 1.17.66 1.59L19.8 15.3M14.25 3.1c.25.02.5.05.75.08M19.8 15.3l-1.57.39a9.06 9.06 0 01-6.23-.69 9.06 9.06 0 00-6.23-.69L5 14.5m14.8.8l1.4 1.4c1.23 1.23.65 3.32-1.07 3.6A48.3 48.3 0 0112 21a48.3 48.3 0 01-8.13-.7c-1.72-.28-2.3-2.37-1.07-3.6L5 14.5"
  />
)
export const SpeakerIcon = (p: Props) => (
  <Svg
    {...p}
    d="M19.1 5.64a9 9 0 010 12.72M16.46 8.29a5.25 5.25 0 010 7.42M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.7-.51-1.94-1.35A9 9 0 012.25 12c0-.83.11-1.63.32-2.4.24-.84 1.06-1.35 1.94-1.35h2.24z"
  />
)
export const ChevronRightIcon = (p: Props) => (
  <Svg {...p} d="M8.25 4.5l7.5 7.5-7.5 7.5" />
)
export const XIcon = (p: Props) => <Svg {...p} d="M6 18L18 6M6 6l12 12" />

export function GitHubIcon({ className = 'h-4 w-4' }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .3a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 016 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.2.8.8 1.2 1.9 1.2 3.1 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.1.9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0012 .3" />
    </svg>
  )
}
