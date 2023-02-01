// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {supabase} from "../../../utils/supabase";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const {data, error, status} = await supabase
    .from('products')
    .select(`id, created_at, name, comments(id, created_at, text, rating)`)
  res.status(200).json(data);
}
