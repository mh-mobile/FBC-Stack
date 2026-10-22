import type { ReactNode } from 'react'

type Props = {
  title?: ReactNode
  description?: ReactNode
  action?: ReactNode
  id?: string
  className?: string
  bodyClassName?: string
  children: ReactNode
}

export default function Panel({
  title,
  description,
  action,
  id,
  className = '',
  bodyClassName = 'p-4 sm:p-5',
  children,
}: Props) {
  return (
    <section
      id={id}
      className={`scroll-mt-28 sm:scroll-mt-20 overflow-hidden rounded-xl border border-line bg-surface ${className}`}
    >
      {title && (
        <header className="flex items-start justify-between gap-4 border-b border-line px-4 py-3 sm:px-5">
          <div className="min-w-0">
            <h2 className="text-sm font-semibold">{title}</h2>
            {description && (
              <p className="mt-0.5 text-xs text-muted">{description}</p>
            )}
          </div>
          {action}
        </header>
      )}
      <div className={bodyClassName}>{children}</div>
    </section>
  )
}
