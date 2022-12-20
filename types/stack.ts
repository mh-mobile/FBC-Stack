export type StackDetail = {
  name: string
  version: string
}

export type StackTool = {
  name: string
  detail: StackDetail[]
}

export type Stack = StackTool[]
