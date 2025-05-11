import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  exists: boolean
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { postId } = req.query

  try {
    const response = await fetch(
      `https://fbc-stack-storage.com/${postId}.m4a`,
      {
        method: 'HEAD',
      },
    )

    const exists = response.ok
    res.status(200).json({ exists })
  } catch (error) {
    // If there's an error, assume the file doesn't exist
    res.status(200).json({ exists: false })
  }
}
