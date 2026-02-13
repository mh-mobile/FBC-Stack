import ToolBadge from './ToolBadge'
import MarkdownRenderer from './MarkdownRenderer'
import type { PostData } from '../../types/postData'

type Props = {
  postData: PostData
}

export default function ServiceContent({ postData }: Props) {
  return (
    <div>
      <div>
        <MarkdownRenderer content={postData.markdownContent} />
      </div>

      {/* Tech Stack */}
      <div className="mt-6 space-y-4" id="stack">
        <h2 className="text-lg font-bold">Tech Stack</h2>
        {postData.stack.map(({ name, detail }) => (
          <div key={name} className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="border-b border-gray-100 bg-gray-50 px-5 py-3">
              <span className="text-sm font-semibold text-gray-700">
                {name}
              </span>
              <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-600">
                {detail.length}
              </span>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 md:gap-3">
                {detail.map(({ name, version }) => {
                  const toolId = postData.toolPathInfo?.[name]
                  if (!toolId) return null
                  return (
                    <ToolBadge
                      key={name}
                      id={toolId}
                      name={name}
                      version={version}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
