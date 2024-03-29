// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {supabase} from "../../../utils/supabase";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const productId = req.query.productId;

  if (req.method === "DELETE"){
    const response = await supabase
      .from('products')
      .delete()
      .eq('id', productId)
    res.status(200).json(response.status);
  }
  else if (req.method === "GET") {
    const { data, error, status } = await supabase
      .from('product_comments_count')
      .select(`
      id, 
      created_at, 
      name, 
      price, 
      type, 
      image_url,
      num_comments,
      rating,
      recommendation_rating,
      comments(
        id, 
        created_at, 
        text, 
        rating, 
        recommendation_rating,
        author:users(*)
       )`)
      .eq('id', productId)
    res.status(200).json(data);
  }
}
