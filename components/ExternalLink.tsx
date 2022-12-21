import { ReactNode } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'

type Props = {
  children: ReactNode
  href: string
}

const ExternalLink: NextPage<Props> = ({ children, href }) => {
  return (
    <Link href={href} legacyBehavior>
      <a
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none' }}
      >
        {children}
      </a>
    </Link>
  )
}

export default ExternalLink
