import type { ReactNode } from 'react'

type Props = {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  children?: ReactNode
}

export default function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: Props) {
  return (
    <div className="pb-6 pt-2 sm:pb-8">
      {eyebrow && (
        <div className="mb-2 font-mono text-xs uppercase tracking-wider text-muted">
          {eyebrow}
        </div>
      )}
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
      {description && (
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-fg-2 sm:text-base">
          {description}
        </p>
      )}
      {children}
    </div>
  )
}
