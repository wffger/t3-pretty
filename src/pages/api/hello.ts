import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  message: string
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === 'GET') {
    res.status(200).json({ message: 'You send a GET' })
  } else {
    res.status(200).json({ message: 'Not a GET method' })
  }
}
