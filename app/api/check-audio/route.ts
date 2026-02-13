import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const postId = request.nextUrl.searchParams.get('postId')

  try {
    const response = await fetch(
      `https://fbc-stack-storage.com/${postId}.m4a`,
      { method: 'HEAD' },
    )
    return NextResponse.json({ exists: response.ok })
  } catch {
    return NextResponse.json({ exists: false })
  }
}
