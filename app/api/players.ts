import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const results = await query({
      query: 'SELECT * FROM users',
      values: [],
    });
    return res.json({ results: results });
  } else {
    res
      .status(500)
      .json({ error: Error, message: 'shit aint allowed up in here' });
  }
}
