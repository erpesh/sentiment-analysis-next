// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {supabase} from "../../utils/supabase";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  let {query} = req.query;
  if (query){
    if (Array.isArray(query))
      query = query.join("");
    const {data, error, status} = await supabase
      .from('product_comments_count')
      .select(`*`)
      .textSearch("name", query)

    res.status(200).json(data);
    console.log(data)
  }
}
