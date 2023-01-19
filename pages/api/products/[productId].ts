// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {supabase} from "../../../utils/supabase";
import {Database} from "../../../utils/database.types";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const productId = req.query.productId;

  if (req.method === "POST") {
    const body = JSON.parse(req.body);
    try {
      const {data, error, status} = await supabase
        .from('comments')
        .insert(body)
        .select(`*`);
      res.status(200).json(data);
    } catch (e: any) {
      res.status(500).json(e.message);
    }
  } else {
    const {data, error, status} = await supabase
      .from('products')
      .select(`id, created_at, name, comments(*)`)
      .eq('id', productId)
      .single()
    res.status(200).json(data);
  }
}
