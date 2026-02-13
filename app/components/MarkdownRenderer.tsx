import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type Props = {
  content: string
}

export default function MarkdownRenderer({ content }: Props) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => (
          <p className="mb-4 break-words">{children}</p>
        ),
        li: ({ children }) => (
          <li className="relative mb-2 block w-full break-all pl-6 before:absolute before:left-0 before:content-['•']">
            {children}
          </li>
        ),
        a: ({ href, children }) => (
          <a
            href={href ?? ''}
            target="_blank"
            rel="noopener noreferrer"
            className="inline break-all text-external-link hover:underline"
          >
            {children}
          </a>
        ),
        h1: ({ children }) => (
          <h1 className="mb-4 mt-6 text-2xl font-bold">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="mb-3 mt-5 text-xl font-bold">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="mb-2 mt-4 text-lg font-semibold">{children}</h3>
        ),
        ul: ({ children }) => (
          <ul className="mb-4 list-none">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="mb-4 list-decimal pl-6">{children}</ol>
        ),
        blockquote: ({ children }) => (
          <blockquote className="mb-4 border-l-4 border-gray-300 pl-4 italic text-gray-600">
            {children}
          </blockquote>
        ),
        code: ({ children, className }) => {
          const isInline = !className
          if (isInline) {
            return (
              <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm">
                {children}
              </code>
            )
          }
          return (
            <code className="block overflow-x-auto rounded-lg bg-gray-100 p-4 text-sm">
              {children}
            </code>
          )
        },
        pre: ({ children }) => (
          <pre className="mb-4">{children}</pre>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
