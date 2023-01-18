// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {Database} from "../../../utils/database.types";
import {supabase} from "../../../utils/supabase";

type TProduct = Database['public']['Tables']['products']['Row']

// async function getProduct(productId: string | string[] | undefined ){
//
//   let {data, error, status} = await supabase
//     .from('products')
//     .select(`id, created_at, name`)
//     .eq('id', productId)
//     .single()
// }

export default async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const productId = req.query.productId;
  const {data, error, status} = await supabase
    .from('products')
    .select(`id, created_at, name`)
    .eq('id', productId)
    .single()
  res.status(200).json(data);
}
