import type { ReactNode } from 'react'

type Props = {
  href: string
  children: ReactNode
}

export default function ExternalLink({ href, children }: Props) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="no-underline">
      {children}
    </a>
  )
}
