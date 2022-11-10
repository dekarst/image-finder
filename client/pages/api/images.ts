import type { NextApiRequest, NextApiResponse } from 'next'

type TPhoto = {
  id: string,
  url: string,
  alt: string,
  photographer: string,
}

type TResult = {
  totalCount: number,
  perPage: number,
  page: number,
  photos: TPhoto[],
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TResult>
) {
  const response = await fetch(
    `${API_URL}/images`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: req.body,
    }
  )
  const result = await response.json()
  res.json(result)
}
