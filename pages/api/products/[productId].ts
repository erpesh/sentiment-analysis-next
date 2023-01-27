// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {supabase} from "../../../utils/supabase";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const productId = req.query.productId;

  const {data, error, status} = await supabase
    .from('products')
    .select(`id, created_at, name, rating, comments(id, created_at, text, rating)`)
    .eq('id', productId)
    .single()
  res.status(200).json(data);
}
