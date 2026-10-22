'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="text-[15px] leading-relaxed text-fg-2 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => <p className="mb-4 break-words">{children}</p>,
          li: ({ children }) => (
            <li className="mb-1.5 break-words pl-1">{children}</li>
          ),
          a: ({ href, children }) => (
            <a
              href={href ?? ''}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
            >
              {children}
            </a>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-fg">{children}</strong>
          ),
          h1: ({ children }) => (
            <h2 className="mb-3 mt-8 text-lg font-semibold text-fg">
              {children}
            </h2>
          ),
          h2: ({ children }) => (
            <h2 className="mb-3 mt-8 text-lg font-semibold text-fg">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mb-2 mt-6 font-semibold text-fg">{children}</h3>
          ),
          ul: ({ children }) => (
            <ul className="mb-4 list-disc pl-5 marker:text-muted">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-4 list-decimal pl-5 marker:text-muted">
              {children}
            </ol>
          ),
          blockquote: ({ children }) => (
            <blockquote className="mb-4 border-l-2 border-line-strong pl-4 text-muted">
              {children}
            </blockquote>
          ),
          code: ({ children, className }) =>
            className ? (
              <code className="block overflow-x-auto rounded-lg bg-surface-2 p-4 font-mono text-sm">
                {children}
              </code>
            ) : (
              <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[0.9em]">
                {children}
              </code>
            ),
          pre: ({ children }) => <pre className="mb-4">{children}</pre>,
          img: ({ src, alt }) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={typeof src === 'string' ? src : ''}
              alt={alt ?? ''}
              className="my-4 rounded-lg border border-line"
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
