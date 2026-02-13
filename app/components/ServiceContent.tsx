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
      <div className="py-5">
        <div id="stack">
          {postData.stack.map(({ name, detail }) => (
            <div key={name} className="mb-5 border border-gray-200 p-5">
              <div>
                <b>
                  {name} ({detail.length})
                </b>
              </div>
              <div className="pt-2">
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
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
    </div>
  )
}
